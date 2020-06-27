import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';

class NavigationMenu extends Component {
  getBreadCrumb = () => {
    const { pages, currentPage } = this.props;

    let data = [];
    for (let index in pages) {
      if (pages[index].child.length === 0 && pages[index].id === currentPage) {
        data.push(pages[index].title);
        break;
      } else {
        for (let i in pages[index].child) {
          if (pages[index].child[i].id === currentPage) {
            data.push(pages[index].title);
            data.push(pages[index].child[i].title);
            break;
          }
        }
      }
    }

    return data;
  };

  render() {
    const data = this.getBreadCrumb();
    return (
      <div>
        <Breadcrumb separator=">">
          {data.map((item) => (
            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pages: state.event.pages,
  currentPage: state.event.currentPage,
});

export default connect(mapStateToProps, null)(NavigationMenu);
