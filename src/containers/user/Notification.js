import React, { Component } from 'react';
import { List, Avatar, Spin, Tooltip } from 'antd';
import { CheckCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
// import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

import { connect } from 'react-redux';
import { userActions } from 'action/user.action';
import { notificationTypeConstants } from 'constants/index';

const timeStyle = {
  fontSize: '10px',
};

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.notifications,
      loading: false,
      hasMore: true,
    };
  }

  componentDidMount = () => {
    const { getListNotification } = this.props;
    getListNotification();
  };

  loadMoreNotification = () => {
    let { data } = this.state;
    const { getListNotification } = this.props;
    this.setState({
      loading: true,
    });

    if (data.length % 10 !== 0) {
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }

    getListNotification(Math.round(data.length / 10) + 1);
  };

  handleClick = (id, type) => {
    // if(type === '')
    // Get info of event => redirect to event page
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.notifications.length !== prevState.data.length) {
      this.setState({
        data: [...this.props.notifications],
        loading: false,
      });
    }
  };

  getNameSender = (title, username) => {
    const start = title.indexOf('{');
    const end = title.indexOf('}');
    return title.replace(title.slice(start, end + 1), username);
  };

  handleDeleleNotification = (notificationId) => {
    const { data } = this.state;
    const { setDeleteNotification } = this.props;
    const index = data.findIndex((item) => item._id === notificationId);
    if (index !== -1) {
      const newNoties = [
        ...data.slice(0, index),
        ...data.slice(index + 1, data.length),
      ];
      this.setState({ data: newNoties });
      setDeleteNotification(notificationId);
    }
  };

  handleMarkAsRead = (notificationId) => {
    const { data } = this.state;
    const { setReadNotification } = this.props;
    const index = data.findIndex((item) => item._id === notificationId);
    if (index !== -1) {
      const newNoties = [
        ...data.slice(0, index),
        {
          ...data[index],
          isRead: true,
        },
        ...data.slice(index + 1, data.length),
      ];
      this.setState({
        data: newNoties,
      });
      setReadNotification(notificationId);
    }
  };

  renderNotification = (item) => {
    switch (item.type) {
      case 'CREDIT_REFUND_FAILED':
        item.url = notificationTypeConstants.CREDIT_REFUND_FAILED;
        break;
      case 'CREDIT_REFUND_SUCCESS':
        item.url = notificationTypeConstants.CREDIT_REFUND_SUCCESS;
        break;
      case 'SESSION_CANCEL':
        item.url = notificationTypeConstants.SESSION_CANCEL;
        break;
      case 'EVENT_REJECT':
        item.url = notificationTypeConstants.EVENT_REJECT;
        break;
      case 'EVENT_CANCEL':
        item.url = notificationTypeConstants.EVENT_CANCEL;
        break;
      case 'ZALOPAY_REFUND_SUCCESS':
        item.url = notificationTypeConstants.ZALOPAY_REFUND_SUCCESS;
        break;
      case 'ZALOPAY_REFUND_FAILED':
        item.url = notificationTypeConstants.ZALOPAY_REFUND_FAILED;
        break;
      case 'JOINED_EVENT':
        item.url = notificationTypeConstants.JOINED_EVENT;
        break;
      default:
        item.url = notificationTypeConstants.JOINED_EVENT;
    }

    return (
      <List.Item key={item._id} type="button">
        <div>
          <div className="d-flex">
            <List.Item.Meta avatar={<Avatar src={item.url} />} />
            {item.isRead ? (
              <div>
                {this.getNameSender(item.title, item.users_sender.fullName)}
              </div>
            ) : (
              <h6>
                {this.getNameSender(item.title, item.users_sender.fullName)}
              </h6>
            )}
          </div>

          <div className="d-flex">
            <p style={timeStyle} className="ml-3">
              {moment(item.createdAt).startOf('day').fromNow()}
            </p>
            <div className="ml-auto">
              {!item.isRead && (
                <Tooltip title="Mask as read" className="mr-2">
                  <CheckCircleTwoTone
                    onClick={() => this.handleMarkAsRead(item._id)}
                  />
                </Tooltip>
              )}

              <Tooltip title="Delete">
                <DeleteOutlined
                  onClick={() => this.handleDeleleNotification(item._id)}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </List.Item>
    );
  };

  render() {
    const { data, loading, hasMore } = this.state;
    return (
      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.loadMoreNotification}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List
            dataSource={data}
            renderItem={(item) => this.renderNotification(item)}
          >
            {loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  getListNotification: (pageNumber, numberRecord) =>
    dispatch(userActions.getListNotification(pageNumber, numberRecord)),
  setReadNotification: (id) => dispatch(userActions.setReadNotification(id)),
  setDeleteNotification: (id) =>
    dispatch(userActions.setDeleteNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
