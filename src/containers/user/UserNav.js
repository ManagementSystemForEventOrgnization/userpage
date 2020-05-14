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
    const { logout } = this.props;
    const username = localStorage.getItem('fullName');
    const avatar = localStorage.getItem('avatar');
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
            <li className="userName mb-2">
              <b>{username}</b>
            </li>

            <li>
              <Link to="/profile" className="link">
                <ProfileOutlined className="mr-2 icon" />
                Trang cá nhân
              </Link>
            </li>
            <li>
              <Link className="link" to="/registered-event">
                <MoneyCollectOutlined className="mr-2 icon" />
                Sự kiện đã đăng ký
              </Link>
            </li>
            <li>
              <Link className="link" to="/participated-event">
                <MoneyCollectOutlined className="mr-2 icon" />
                Sự kiện đã tham gia
              </Link>
            </li>
            <li>
              <Link to="/created-event" className="link">
                <CalendarOutlined className="mr-2 icon" />
                Sự kiện đã tạo
              </Link>
            </li>

            <li onClick={logout}>
              <div className="link">
                <LogoutOutlined className="mr-2 icon" />
                Đăng xuất
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
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNav);
