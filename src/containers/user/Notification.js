import React, { Component } from 'react';
import { List, Avatar, Spin, Tooltip } from 'antd';
import { CheckCircleTwoTone, DeleteOutlined } from '@ant-design/icons';
// import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

import { connect } from 'react-redux';
import { userActions } from 'action/user.action';
import { notificationTypeConstants } from 'constants/index';
import history from 'utils/history';

const timeStyle = {
  fontSize: '10px',
};

let page = 1;

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.notifications,
      loading: true,
      // hasMore: true,
    };
  }

  componentDidMount = () => {
    if (page === 1) {
      const { getListNotification } = this.props;
      getListNotification();
    }
  };

  loadMoreNotification = () => {
    if (this.props.isLoadedMore) {
      page += 1;
      this.setState({
        loading: true,
      });
      this.props.getListNotification(page);
    }
  };

  handleLoadLatest = () => {
    page = 1;
    this.props.getListNotification(page);
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
    if (!username) return title;
    const start = title.indexOf('{');
    const end = title.indexOf('}');
    return title.replace(title.slice(start, end + 1), username) || '';
  };

  handleDeleleNotification = (notificationId) => {
    if (this.state.data.length === 5) {
      this.loadMoreNotification();
    }
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
              <div
                onClick={() =>
                  item.linkTo.urlWeb
                    ? window.location.replace(item.linkTo.urlWeb)
                    : history.push('/profile')
                }
              >
                {this.getNameSender(item.title, item.users_sender.fullName)}
              </div>
            ) : (
                <h6
                  onClick={() =>
                    this.handleMarkAsRead(item._id) || item.linkTo.urlWeb
                      ? window.location.replace(item.linkTo.urlWeb)
                      : history.push('/profile')
                  }
                >
                  <b>
                    {this.getNameSender(item.title, item.users_sender.fullName)}
                  </b>
                </h6>
              )}
          </div>

          <div className="d-flex">
            <p style={timeStyle} className="ml-3">
              {new Date(item.createdAt).toLocaleString()}
            </p>
            <div className="ml-auto">
              {!item.isRead && (
                <Tooltip title="Mask as read" className="mr-2">
                  <CheckCircleTwoTone
                    type="button"
                    onClick={() => this.handleMarkAsRead(item._id)}
                  />
                </Tooltip>
              )}

              <Tooltip title="Delete">
                <DeleteOutlined
                  type="button"
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
    const { data, loading } = this.state;
    return (
      <div className="demo-infinite-container">
        {this.props.pending && (
          <div className="demo-loading-container">
            <Spin />
          </div>
        )}
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.loadMoreNotification}
          hasMore={!loading}
          useWindow={false}
        >
          <button
            type="button"
            className="btn btn-link"
            style={{ width: '100px' }}
            onClick={() => this.handleLoadLatest()}
            disabled={this.props.pending}
          >
            Reload
            <i className="fa fa-arrow-up" aria-hidden="true"></i>
          </button>
          <List
            dataSource={data}
            renderItem={(item) => this.renderNotification(item)}
          ></List>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
  isLoadedMore: state.user.isLoadedMore,
  pending: state.user.pending,
});

const mapDispatchToProps = (dispatch) => ({
  getListNotification: (pageNumber, numberRecord) =>
    dispatch(userActions.getListNotification(pageNumber, numberRecord)),
  setReadNotification: (id) => dispatch(userActions.setReadNotification(id)),
  setDeleteNotification: (id) =>
    dispatch(userActions.setDeleteNotification(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
