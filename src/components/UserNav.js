import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    MoneyCollectOutlined,
    CalendarOutlined,
    ProfileOutlined,
    LogoutOutlined
} from '@ant-design/icons';

export default class UserNav extends Component {
    render() {
        const name = "Hoàng Nhi";
        const imageUrl = "https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1412243/1160/772/m1/fpnw/wm0/lawyer-avatar-flat-icon-01-.jpg?1467280299&s=d7eb6ecfdcefaea78ca2cef1143c9dde";

        return (
            <div className="user-nav ">
                <input type="checkbox" id="menu" />
                <label for="menu" className="menu">
                    <span><img src={imageUrl} alt="menu"></img></span>
                    <b className="userName" >{name}</b>
                </label>
                <nav className="nav">
                    <ul>
                        <li><Link className="link" to=""><MoneyCollectOutlined className="mr-2 icon" />
                            Vé đã đặt</Link></li>
                        <li><Link to="" className="link" ><CalendarOutlined className="mr-2 icon" />
                            Sự kiện đã tạo</Link></li>
                        <li><Link to="" className="link" ><ProfileOutlined className="mr-2 icon" />
                            Trang cá nhân</Link></li>
                        <li><Link to="" className="link" ><LogoutOutlined className="mr-2 icon" />
                            Đăng xuất</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}
