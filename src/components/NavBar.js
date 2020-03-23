import React from 'react';
import { Menu } from 'antd';
import {Link} from 'react-router-dom';
import {
    MailOutlined
} from '@ant-design/icons';


const typeOfEvents = [
    "Hội nghị",
    "Thể thao",
    "Du lịch",
    "Sân khấu-Nghệ thuật",
    "Tình nguyện",
    "Workshop",
    "Talkshow",
    
]


class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            current: typeOfEvents[0],
        }
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
    };


    render(){
        const {current} = this.state;
        return(
        <Menu onClick={this.handleClick} selectedKeys={current} mode="horizontal">
        {
            typeOfEvents.map((item, index)=>
            <Menu.Item key={index}>
                {/* <MailOutlined /> */}
                <Link to={item}>{item}</Link>
            </Menu.Item>)
        }
      </Menu>);
    }
}

export default NavBar;
