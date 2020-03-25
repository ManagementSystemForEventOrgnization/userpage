import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';

import NavBar from '../../components/NavBar';
import UserNav from '../_layout/UserNav';


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
            // state variables 
        }
    }

    render() {
        return (
            <div className="head fixed-top">
                <nav className="nav header ">
                    <Link to="" className="nav-link active" href="#">Active</Link>
                    <Link to="" className="nav-link" href="#">
                        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    </Link>
                    <Link to="" className="nav-link" href="#">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Tạo Sự Kiện
                       </Button>
                    </Link>
                    {/* <Link to="" className="nav-link ml-auto" href="#">
                    </Link> */}

                    <div className="nav-link ml-auto user-nav" >
                        <UserNav></UserNav>

                    </div>

                </nav>


                <NavBar typeOfEvents={typeOfEvents} />

            </div>
        )
    }

}


export default Header;
