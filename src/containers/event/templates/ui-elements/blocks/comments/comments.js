import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { eventActions } from 'action/event.action';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const iconStyle = {
  fontSize: '20px',
};

class CommentEvent extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    const isLogined = localStorage.getItem('isLogined');
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');
    this.state = style
      ? { ...style }
      : {
          margin: [1, 1, 1, 1],
          padding: [1, 1, 1, 1],
          list: [1, 2, 3, 4],
          comments: [],
          submitting: false,
          value: '',
          content: '',
          isLogined,
          username,
          avatar,
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

  handleSubmit = () => {
    const { value, username, avatar } = this.state;
    if (!value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: username,
            avatar: avatar,
            content: <p>{value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
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

  render() {
    const {
      margin,
      padding,
      comments,
      submitting,
      value,
      isLogined,
      username,
      avatar,
    } = this.state;
    const { editable } = this.props;
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

          {comments.length > 0 && (
            <CommentList comments={comments} className="mt-5" />
          )}
        </div>

        {editable && (
          <div className="icons-handle">
            <PlusCircleTwoTone
              style={iconStyle}
              className="mt-3"
              onClick={this.addPhoto}
            />
            <MinusCircleTwoTone
              style={iconStyle}
              className="mt-3"
              onClick={this.removePhoto}
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
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentEvent);
