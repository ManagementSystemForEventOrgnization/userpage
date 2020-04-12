import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';

import UserNav from '../../user/UserNav';
import { userActions } from '../../../action/user.action'

const { Search } = Input;


class Header extends React.Component {

    render() {
        const { isLogined } = this.props;
        return (
            <div className="head ">
                <nav className="nav header ">
                    <Link to="" className="nav-link active web-name mr-5">EVENT IN YOUR HAND</Link>
                    <Search className=" nav-link ml-5 search" enterButton />
                    <div className="nav-link ml-auto user-nav" >
                        {isLogined ?
                            <UserNav /> :
                            <>
                                <Link className="mr-4 login" to="/login" >
                                    Đăng Nhập
                                </Link>
                                <Link to="/signup" className=" mr-3 register" >
                                    <Button size="large" type="danger">Đăng Ký Miễn Phí</Button>

                                </Link>
                            </>
                        }


                    </div>

                </nav>


                {/* <NavBar typeOfEvents={typeOfEvents} /> */}

            </div>
        )
    }

}



const mapStateToProps = state => ({
    isLogined: state.user.isLogined,
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(userActions.logout()),
});



export default connect(mapStateToProps, mapDispatchToProps)(Header)
