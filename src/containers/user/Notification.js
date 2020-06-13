import React, { Component } from 'react';
import { List, Avatar, Spin } from 'antd';
import { Link } from 'react-router-dom';
// import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
// import moment from 'moment';
import { connect } from 'react-redux';
import { userActions } from 'action/user.action';
import { notificationTypeConstants } from 'constants/index';

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

  handleClick = () => {};

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
      <Link to="">
        <List.Item key={item._id} onClick={this.handleClick}>
          <List.Item.Meta
            avatar={<Avatar src={item.url} />}
            title={<a href="https://ant.design">{item.name}</a>}
            description={item.email}
          />
          <div>Content</div>
        </List.Item>
      </Link>
    );
  };

  render() {
    const { data, loading, hasMore } = this.state;

    return (
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
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  getListNotification: (pageNumber, numberRecord) =>
    dispatch(userActions.getListNotification(pageNumber, numberRecord)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
