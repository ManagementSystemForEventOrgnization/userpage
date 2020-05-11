import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import UserNav from '../../user/UserNav';
import { userActions } from '../../../action/user.action';

class Header extends React.Component {
  componentWillMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  };
  render() {
    const { isLogined } = this.props;
    return (
      <div className="head ">
        <nav className="nav header ">
          <Link to="" className="nav-link active web-name mr-5">
            EVENT IN YOUR HAND
          </Link>
          <div className="nav-link ml-auto user-nav">
            {isLogined ? (
              <UserNav />
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
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userActions.logout()),
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
