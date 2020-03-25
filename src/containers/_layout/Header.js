import React from 'react';
import { Input, Tooltip, Button } from 'antd';
import {Link} from 'react-router-dom';
import {
    UserOutlined,
    PlusOutlined,
    MoneyCollectOutlined,
    CalendarOutlined,
    ProfileOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import NavBar from '../../components/NavBar';


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
        const userInfor = <div style={{ width: '140px' }}>
            <Button className="mt-1" icon={<MoneyCollectOutlined />}>
                Vé đã đặt
            </Button>
            <Button className="mt-1" icon={<CalendarOutlined />}>
                Sự kiện đã tạo
            </Button>
            <Button className="mt-1" icon={<ProfileOutlined />}>
                Trang cá nhân
            </Button>
            <Button className="mt-1" icon={<LogoutOutlined />}>
                Đăng xuất
            </Button>
            
            
        </div>;
        return (
        <div className="fixed-top  head">
            <nav className="nav header navbar navbar-expand-lg ">
                <Link className="mr-5 active" to='/'>HOME</Link>

                
                <Search className="ml-5" style={{width: 250}} placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                <Button className="ml-4" type="primary" icon={<PlusOutlined />}>
                    Tạo Sự Kiện
                </Button>

                <Tooltip className="mt-1 ml-1 nav-link ml-auto" placement="bottom" title={userInfor}>
                    <Button type="primary" icon={<UserOutlined />}>
                        Hoàng Nhi
                </Button>
                </Tooltip>
              
            </nav>

       
            <NavBar typeOfEvents={typeOfEvents}/>

        </div>
        )
    }

}


export default Header;
