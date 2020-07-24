import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MoneyCollectOutlined,
  CalendarOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { userActions } from '../../action/user.action';

class UserNav extends Component {
  render() {
    const { logout, userInfo } = this.props;

    const username =
      userInfo && userInfo.username
        ? userInfo.username
        : localStorage.getItem('username');

    // const avatar =
    //   userInfo && userInfo.avatar
    //     ? userInfo.avatar
    //     : localStorage.getItem('avatar');

    const avatar =
      userInfo && userInfo.avatar === '/avata.png'
        ? localStorage.getItem('avatar')
        : userInfo.avatar;

    return (
      <div className="user-nav ">
        <input type="checkbox" id="menu" />

        <label htmlFor="menu" className="menu">
          <span>
            <img src={avatar} alt="menu"></img>
          </span>
        </label>

        <nav className="nav">
          <ul>
            <li className="userName pb-5 pt-0">
              <b>{username}</b>
            </li>

            <li>
              <Link to="/profile" className="link">
                <ProfileOutlined className="mr-2 icon" />
                Profile
              </Link>
            </li>
            <li>
              <Link className="link" to="/registered-event">
                <MoneyCollectOutlined className="mr-2 icon" />
                Registered Events
              </Link>
            </li>

            <li>
              <Link to="/created-event" className="link">
                <CalendarOutlined className="mr-2 icon" />
                Created Events
              </Link>
            </li>

            <li onClick={logout}>
              <div className="link">
                <LogoutOutlined className="mr-2 icon" />
                Logout
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNav);
