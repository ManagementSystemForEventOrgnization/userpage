import React, { Component } from 'react';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // const { editable } = this.props;
    // if (editable) {
    //   this.handleStoreStyleHeader();
    // }
  };

  handleStoreStyleHeader = () => {
    const currentStyle = this.state;
    const { storeStyleHeader } = this.props;
    storeStyleHeader(currentStyle);
  };
  render() {
    const style = {
      color: 'black',
      padding: '1%',
      margin: '1%',
      width: '100%',
    };
    const { pages, currentPage, editable } = this.props;
    return (
      <Menu mode="horizontal" style={style} selectedKeys={currentPage}>
        {pages.map((item) =>
          item.child.length === 0 ? (
            <Menu.Item
              key={item.id}
              disabled={editable && item.id !== currentPage}
            >
              {item.title}
            </Menu.Item>
          ) : (
            <SubMenu
              key={item.id}
              title={<span>{item.title}</span>}
              disabled={editable && item.id !== currentPage}
            >
              {item.child.map((child) => (
                <Menu.Item key={child.id}>{child.title}</Menu.Item>
              ))}
            </SubMenu>
          )
        )}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  pages: state.event.pages,
  currentPage: state.event.currentPage,
});

export default connect(mapStateToProps, null)(Header);
