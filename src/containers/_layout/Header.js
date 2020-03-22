import React from 'react';
import { Input, Tooltip, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Search } = Input;

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // state variables 
        }
    }

    render() {
        const userInfor = <div>
            <p><b>user name:</b> Hoang Nhi</p>
        </div>;
        return (
            <div>
                <nav className="nav header fixed-top">
                    <a className="nav-link active" href="#">Active</a>
                    <a className="nav-link" href="#">Link</a>
                    <a className="nav-link" href="#">Link</a>
                    <a className="nav-link" href="#">
                        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    </a>
                    <a className="nav-link float-right" href="#">
                        <UserOutlined />
                        <Tooltip className="mt-1 ml-1" placement="bottom" title={userInfor}>
                            <label>username</label>
                        </Tooltip>
                    </a>
                </nav>

            </div>

        )
    }

}


export default Header;