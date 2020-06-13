import React, { Component } from 'react';
import { List, Avatar, Spin } from 'antd';
// import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
// import moment from 'moment';
import { connect } from 'react-redux';
import { userActions } from 'action/user.action';

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
          renderItem={(item) => (
            <List.Item key={item._id} onClick={this.handleClick}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
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
