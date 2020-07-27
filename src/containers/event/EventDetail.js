import React from 'react';
import { connect } from 'react-redux';
// import { Spin } from 'antd';

import { blockList } from './data/data';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: props.blocks,
      currentPage: props.currentPage,
    };
  }

  renderBlocks = (item) => {
    const { match } = this.props;
    const param =
      item.style && Object.keys(item.style).length !== 0
        ? {
            id: item.id,
            style: item.style,
            editable: false,
            match,
          }
        : {
            id: item.id,
            editable: false,
            match,
          };

    return blockList[item.type](param);
  };

  renderHeader = () => {
    const { pages, headerStyle, editable, match } = this.props;
    const param = headerStyle
      ? {
          id: 'header',
          editable,
          match,
          pages,
          currentPage: pages[0].id,
        }
      : {
          id: 'header',
          editable,
          style: headerStyle,
          match,
          pages,
          currentPage: pages[0].id,
        };
    return blockList['header'](param);
  };

  render() {
    const { blocks } = this.props;

    return (
      <div className="pl-5 pr-5  event-detail">
        <div className="fixed-top">{this.renderHeader()}</div>
        <div
          style={{
            marginTop: '5%',
          }}
        >
          {blocks.map((item) => this.renderBlocks(item))}
        </div>
      </div>
      //   )}
      // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  id: state.event.id,
  pages: state.event.pages,
  headerStyle: state.event.headerStyle,
  currentPage: state.event.currentPage,
});

export default connect(mapStateToProps, null)(EventDetail);
