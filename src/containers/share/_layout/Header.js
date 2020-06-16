import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Popover, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import UserNav from '../../user/UserNav';
import { userActions } from 'action/user.action';
import Notification from 'containers/user/Notification';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      open: false,
    };
  }

  handleVisibleChange = (visible) => {
    this.setState({ visible, open: true });
  };

  componentDidMount = () => {
    if (localStorage.getItem('isLogined')) {
      const { getNumUnreadNotification, getListNotification } = this.props;
      getNumUnreadNotification();
      getListNotification();
    }
  };

  render() {
    const isLogined = localStorage.getItem('isLogined');
    const { numUnreadNotification } = this.props;
    const { visible, open } = this.state;

    return (
      <div className="head ">
        <nav className="nav header ">
          <Link to="" className="nav-link active web-name mr-5">
            EVENT IN YOUR HAND
          </Link>
          <div className="nav-link ml-auto user-nav">
            {isLogined ? (
              <div className="d-flex  mr-5">
                <Popover
                  title="Notifications"
                  style={{ width: 1000 }}
                  content={<Notification type="button" />}
                  trigger="click"
                  visible={visible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  {numUnreadNotification > 0 && !open ? (
                    <Badge
                      count={
                        numUnreadNotification > 99
                          ? '99+'
                          : numUnreadNotification
                      }
                      className="mt-2"
                      type="button"
                    >
                      <BellOutlined style={{ fontSize: 23 }} />
                    </Badge>
                  ) : (
                      <div type="button">
                        <BellOutlined style={{ fontSize: 20 }} />
                      </div>
                    )}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogined: state.user.isLogined,
  numUnreadNotification: state.user.numUnreadNotification,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
  getNumUnreadNotification: () =>
    dispatch(userActions.getNumUnreadNotification()),

  getListNotification: (pageNumber, numberRecord) =>
    dispatch(userActions.getListNotification(pageNumber, numberRecord)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
