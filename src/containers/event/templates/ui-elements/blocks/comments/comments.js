import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import { eventActions } from 'action/event.action';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    // header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const iconStyle = {
  fontSize: '20px',
};

const isLogined = localStorage.getItem('isLogined');
const username = localStorage.getItem('username');
const avatar = localStorage.getItem('avatar');

class CommentEvent extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:4000');

    const { style, id } = this.props;
    this.state = style
      ? { ...style }
      : {
          margin: [1, 1, 1, 1],
          padding: [1, 1, 1, 1],
          list: [1, 2, 3, 4],
          value: '',
          content: '',
          eventId: id || localStorage.getItem('currentId'),
          newComment: [],
        };
  }

  configComment = (comments) => {
    return comments.map((item) => ({
      author: item.usersComment
        ? item.usersComment.fullName
        : localStorage.getItem('username'),
      avatar: item.usersComment.avatar,
      content: <p>{item.content}</p>,
      datetime: moment(item.createAt).format('LLL'),
    }));
  };

  componentDidMount = () => {
    const { editable, id } = this.props;
    if (editable) {
      this.handleStoreBlock();
    } else {
      this.socket.on(`cmt-${id}`, (data) => {
        let { newComment } = this.state;

        newComment = newComment
          ? [
              ...newComment,
              {
                author: data.userId.fullName,
                avatar: data.userId.avatar,
                content: <p>{data.content}</p>,
                datetime: moment(data.createAt).format('LLLL'),
              },
            ]
          : [
              {
                author: data.userId.fullName,
                avatar: data.userId.avatar,
                content: <p>{data.content}</p>,
                datetime: moment(data.createAt).format('LLLL'),
              },
            ];

        setTimeout(
          this.setState({
            newComment,
          }),
          2000
        );

        console.log(data);
      });
    }
  };

  handleSubmit = () => {
    let { value, eventId } = this.state;
    const { saveComment, id } = this.props;
    if (!value) {
      return;
    }

    saveComment(eventId || id, value);

    setTimeout(() => {
      this.setState({
        value: '',
      });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleStoreBlock = () => {
    const { blocks, storeBlocksWhenCreateEvent, id } = this.props;
    const currentStyle = this.state;

    let item = blocks.find((ele) => ele.id === id);

    if (item) {
      const index = blocks.indexOf(item);
      item.style = currentStyle;
      storeBlocksWhenCreateEvent([
        ...blocks.slice(0, index),
        item,
        ...blocks.slice(index + 1, blocks.length),
      ]);
    }
  };

  deleteBlock = () => {
    const { id, deleteBlock } = this.props;
    if (deleteBlock) {
      deleteBlock(id);
    }
  };

  ableToLoadMore = (count) => {
    if (count === 5) return true;
    return count % 5 === 0;
  };

  handleLoadMore = () => {
    const { comments, getComment, id } = this.props;
    const { eventId } = this.state;
    const page = Math.round(comments.length / 5);
    getComment(eventId || id, page + 1);
  };

  render() {
    const { margin, padding, value, newComment } = this.state;
    const { editable, submitting, comments } = this.props;
    const commentList = this.configComment(comments);
    const style = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
    };

    const loadMore = {
      color: '#1890ff',
      textdecoration: 'underline',
    };

    return (
      <div className="d-flex child-block" style={style}>
        <div style={{ width: '100%' }}>
          {isLogined ? (
            <Comment
              avatar={<Avatar src={avatar} alt={username} />}
              content={
                <Form>
                  <Form.Item>
                    <TextArea
                      rows={4}
                      onChange={this.handleChange}
                      value={value}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      loading={submitting}
                      onClick={this.handleSubmit}
                      type="primary"
                    >
                      Add Comment
                    </Button>
                  </Form.Item>
                </Form>
              }
            />
          ) : (
            <Link to="/login">
              <Button>Login to add comments</Button>
            </Link>
          )}

          <hr />
          {newComment && <CommentList comments={newComment} />}
          <CommentList comments={commentList} className="mt-5" />
          <hr />
          {this.ableToLoadMore(commentList.length) && (
            <p onClick={this.handleLoadMore} style={loadMore} type="button">
              Load more
            </p>
          )}
        </div>

        {editable && (
          <div className="icons-handle ml-auto">
            <EditTwoTone style={iconStyle} />
            <DeleteTwoTone
              style={iconStyle}
              className="mt-3"
              onClick={this.deleteBlock}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  userInfo: state.user.userInfo,
  comments: state.event.comments,
  id: state.event.id,
  submitting: state.event.submitting,
  countComment: state.event.countComment,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
  saveComment: (eventId, content) =>
    dispatch(eventActions.saveComment(eventId, content)),
  getComment: (eventId, pageNumber, numberRecord) =>
    dispatch(eventActions.getComment(eventId, pageNumber, numberRecord)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentEvent);
