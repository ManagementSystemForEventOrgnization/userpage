import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Input } from 'antd';

import NavBar from '../../../components/NavBar'
import UserNav from '../../user/UserNav';
import { userActions } from '../../../action/user.action'

const { Search } = Input;
const typeOfEvents = [
    "Hội nghị",
    "Thể thao",
    "Du lịch",
    "Sân khấu-Nghệ thuật",
    "Tình nguyện",
    "Workshop",
    "Talkshow"
]


class Header extends React.Component {

    render() {
        const { isLogined } = this.props;
        return (
            <div className="head fixed-top">
                <nav className="nav header ">
                    <Link to="" className="nav-link active web-name mr-5">EVENT IN YOUR HAND</Link>
                    <Search className=" nav-link ml-5 search" enterButton />
                    <div className="nav-link ml-auto user-nav" >
                        {isLogined ?
                            <UserNav /> :
                            <>
                                <Link className="mr-5 login" to="/login" >
                                    Đăng Nhập
                                </Link>
                                <Link to="/signup" className="login mr-3" >
                                    Đăng Ký
                                </Link>
                            </>
                        }


                    </div>

                </nav>


                <NavBar typeOfEvents={typeOfEvents} />

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
