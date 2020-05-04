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

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { current, categories } = this.state;

    return (
      <div className="shadow">
        <Menu
          onClick={this.handleClick}
          selectedKeys={current}
          mode="horizontal"
        >
          {categories.map((item) => {
            const newName = item.name.toLowerCase().replace(/\s/g, '');
            const url = `/event-list/${newName}`;
            return !item.isDelete ? (
              <Menu.Item key={item._id}>
                <Link to={url}>{item.name}</Link>
              </Menu.Item>
            ) : (
              ''
            );
          })}
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
