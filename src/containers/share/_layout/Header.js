import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Tooltip, Popover, Badge } from 'antd';
import {
  BellOutlined

} from '@ant-design/icons';
import moment from 'moment';
import UserNav from '../../user/UserNav';
import { userActions } from '../../../action/user.action';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount = () => {
    const isLogined = localStorage.getItem('isLogined');
    if (!isLogined) {
      const { getCurrentUser, getListNotification } = this.props;
      getCurrentUser();
      getListNotification();
    }
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const src = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
    const { notifications } = this.props;
    const isLogined = localStorage.getItem('isLogined');
    return (
      <div className="head ">
        <nav className="nav header ">
          <Link to="" className="nav-link active web-name mr-5">
            EVENT IN YOUR HAND
          </Link>
          <div className="nav-link ml-auto user-nav">
            {isLogined ? (
              <div className="d-flex">
                <Popover title="Notifications"
                  style={{ width: 1000 }}
                  content={
                    <div className="d-flex row">
                      <div className="col-2">
                        <img src={src} style={{ width: '50px', height: '40px' }}></img>
                      </div>
                      <div className="col ml-1">
                        <h6>Đã đăng ký thành công sự kiện</h6>
                        <p> {moment().fromNow()}</p>
                      </div>
                    </div>
                  }
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}>
                  <Tooltip placement="bottom" title="notification">
                    <Badge count={1} className="mt-2">
                      <BellOutlined style={{ fontSize: 23 }} />
                    </Badge>
                  </Tooltip>
                </Popover>
                <UserNav />

              </div>
            ) : (
                <>
                  <Link className="mr-4 login" to="/login">
                    Login
                </Link>
                  <Link to="/signup" className=" mr-3 register">
                    <Button size="large" type="danger">
                      Register for free
                  </Button>
                  </Link>
                </>
              )}
          </div>
        </nav>

        {/* <NavBar typeOfEvents={typeOfEvents} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogined: state.user.isLogined,
  notifications: state.user.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),
  getListNotification: () => dispatch(userActions.getListNotification())

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
