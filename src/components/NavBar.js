import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props[0],
        }
    }

    UNSAFE_componentWillMount = () => {
        const { typeOfEvents } = this.props;
        this.setState({
            typeOfEvents,
        })
    }

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };


    render() {
        const { current, typeOfEvents } = this.state;
        return (
            <div className=" category-bar  shadow">
                <Menu onClick={this.handleClick} selectedKeys={current} mode="horizontal">
                    {
                        typeOfEvents.map((item, index) =>
                            <Menu.Item key={index}>
                                {/* <MailOutlined /> */}
                                <Link to={item}>{item}</Link>
                            </Menu.Item>)
                    }
                </Menu>
            </div>
        );
    }
}

export default NavBar;
