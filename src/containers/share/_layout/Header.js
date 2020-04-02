import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Input } from 'antd';


import NavBar from '../../../components/NavBar'
import UserNav from '../../../components/UserNav';


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

    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
        }
    }

    UNSAFE_componentWillReceiveProps = (nextProps)=>{
         if(nextProps.user){
            this.setState({
                isLogined: nextProps.user.isLogined,
            })
        }
    }


    render() {
        const {isLogined} = this.state;
        return (
            <div className="head fixed-top">
                <nav className="nav header ">
                    <Link to="" className="nav-link active web-name mr-5">EVENT IN YOUR HAND</Link>
                    <Search className=" nav-link ml-5 search"  enterButton />
                    <div className="nav-link ml-auto user-nav" >
                        {   isLogined? 
                            <UserNav/> : 
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
    user: state.user.userInfo
})
  

  
  
export default connect(mapStateToProps, null)(Header)
