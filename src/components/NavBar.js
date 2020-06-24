import React from 'react';
import { connect } from 'react-redux';
import { Menu, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import history from '../utils/history';
import { eventActions } from 'action/event.action';

class NavBar extends React.Component {
  handleClickItem = (id) => {
    localStorage.setItem('currentCategory', id);
  };

  componentDidMount = () => {
    const { getCategories } = this.props;
    getCategories();
  };

  render() {
    const { categories } = this.props;
    return (
      <div className="shadow mb-4">
        <Menu onClick={this.handleClick} mode="horizontal">
          {categories.length === 0 ? (
            <Skeleton.Input
              style={{ width: '100%' }}
              active={true}
              size="large"
            />
          ) : (
              categories.map((item) => {
                const newName = item.name.toLowerCase().replace(/\s/g, '');
                const url = `/event-list/${newName}`;
                return !item.isDelete ? (
                  <Menu.Item
                    key={item._id}
                    onClick={() => this.handleClickItem(item._id)}
                  >
                    <Link to={url}>{item.name}</Link>
                  </Menu.Item>
                ) : (
                    ''
                  );
              })
            )}
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
