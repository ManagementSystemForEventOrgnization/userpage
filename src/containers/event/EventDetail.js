import React from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

import { eventActions } from 'action/event.action';
import { blockList } from './data/data';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      currentPage: props.currentPage,
      currentIndex: props.match.match.params.name || props.currentIndex,
      id: props.match.match.params.id || localStorage.getItem('currentId'),
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

  componentDidMount = () => {
    const { getEventDetail } = this.props;
    const { id, currentIndex } = this.state;
    const index = currentIndex ? +localStorage.getItem('currentIndex') : 0;

    getEventDetail(id, index);
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

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.currentIndex !== undefined &&
      prevProps.currentIndex !== this.props.currentIndex
    ) {
      localStorage.setItem('currentIndex', this.props.currentIndex);

      const { id, name } = this.props.match.match.params;
      console.log('changed ', prevProps.currentIndex, this.props.currentIndex);
      this.props.getEventDetail(id, name ? this.props.currentIndex : 0);
    }
  };

  render() {
    const { blocks, pending } = this.props;

    return (
      <div>
        {pending ? (
          <Skeleton active paragraph={{ rows: 20 }} className="p-5" />
        ) : (
          <div>
            {this.renderHeader()}
            {blocks.map((item) => this.renderBlocks(item))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  id: state.event.id,
  pages: state.event.pages,
  headerStyle: state.event.headerStyle,
  currentPage: state.event.currentPage,
  currentIndex: state.event.currentIndex,
  pending: state.event.pending,
});

const mapDispatchToProps = (dispatch) => ({
  getEventDetail: (eventId, index) =>
    dispatch(eventActions.getEventDetail(eventId, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
