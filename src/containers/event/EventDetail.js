import React from 'react';
import { connect } from 'react-redux';

import { eventActions } from '../../action/event.action';
import { blockList } from './data/data';
class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      currentPage: props.currentPage,
      currentIndex: props.currentIndex,
      id: localStorage.getItem('currentId'),
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
    const { id } = this.state;
    const index = localStorage.getItem('currentIndex');

    getEventDetail(id, +index || 0);
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
    const { blocks } = this.props;

    return (
      <div>
        {this.renderHeader()}
        {blocks.map((item) => this.renderBlocks(item))}
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
});

const mapDispatchToProps = (dispatch) => ({
  getEventDetail: (eventId, index) =>
    dispatch(eventActions.getEventDetail(eventId, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
