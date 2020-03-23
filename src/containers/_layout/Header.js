import React from 'react';
import { Input, Tooltip, Button } from 'antd';
import {
    UserOutlined,
    PlusOutlined,
    MoneyCollectOutlined,
    CalendarOutlined,
    ProfileOutlined,
    LogoutOutlined
} from '@ant-design/icons';

const { Search } = Input;

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
            <div>
                <nav className="nav header ">
                    <a className="nav-link active" href="#">Active</a>
                    <a className="nav-link" href="#">
                        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    </a>
                    <a className="nav-link" href="#">
                        <Button type="primary" icon={<PlusOutlined />}>
                            Tạo Sự Kiện
                       </Button>
                    </a>

                    <a className="nav-link ml-auto" href="#">
                        <Tooltip className="mt-1 ml-1" placement="bottom" title={userInfor}>
                            <Button type="primary" icon={<UserOutlined />}>
                                Hoàng Nhi
                       </Button>
                        </Tooltip>
                    </a>
                </nav>

            </div>

        )
    }

}


export default Header;
