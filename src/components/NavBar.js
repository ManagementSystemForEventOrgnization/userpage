import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { eventActions } from '../action/event.action';
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props[0],
      categories: [],
    };
  }

  componentDidMount = () => {
    const { getCategories, categories } = this.props;
    getCategories();
    this.setState({
      categories,
    });
  };

  UNSAFE_componentWillMount = () => {
    const { typeOfEvents } = this.props;
    this.setState({
      typeOfEvents,
    });
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { current, typeOfEvents, categories } = this.state;
    const list = categories.length === 0 ? typeOfEvents : categories;

    return (
      <div className="shadow">
        <Menu
          onClick={this.handleClick}
          selectedKeys={current}
          mode="horizontal"
        >
          {list.map((item, index) => (
            <Menu.Item key={index}>
              <Link to={item}>{item}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.event.categories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(eventActions.getCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
