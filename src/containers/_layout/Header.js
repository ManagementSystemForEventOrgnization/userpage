import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';

import UserNav from './UserNav'
const { Search } = Input;

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // state variables 
        }
    }

    render() {
        return (
            <div className="header">
                <nav className="nav ">
                    <Link to="" className="nav-link active" href="#">Active</Link>
                    <Link to="" className="nav-link" href="#">
                        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    </Link>
                    <Link to="" className="nav-link" href="#">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Tạo Sự Kiện
                       </Button>
                    </Link>
                    <Link to="" className="nav-link ml-auto" href="#">
                        {/* <UserNav></UserNav> */}
                    </Link>
                </nav>

            </div>
        )
    }

}


export default Header;
