import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { eventActions } from 'action/event.action';
import { blockList } from './data/data';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: props.blocks,
      currentPage: props.currentPage,
      currentIndex: props.currentIndex,
      webAddress:
        props.match.match.params.id || localStorage.getItem('webAddress'),
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
    const { getEventDetail, getComment, handleGetEventInfo } = this.props;
    const { webAddress, currentIndex } = this.state;
    const index = currentIndex ? +localStorage.getItem('currentIndex') : 0;
    const isLogined = localStorage.getItem('isLogined');
    const eventId = localStorage.getItem('currentId');

    if (isLogined) {
      getEventDetail(webAddress, index).then(() => {
        handleGetEventInfo(eventId, () => {
          getComment(eventId);
        });
      });
    } else {
      getEventDetail(webAddress, index).then(() => {
        getComment(eventId);
      });
    }
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
      //   localStorage.setItem('currentIndex', this.props.currentIndex);

      const { id, name } = this.props.match.match.params;
      this.props.getEventDetail(id, name ? this.props.currentIndex : 0);
    }
  };

  componentWillUnmount = () => {
    localStorage.removeItem('currentId');
  };

  render() {
    const { blocks, pending } = this.props;

    return (
      <div className="pl-5 pr-5  event-detail">
        {pending ? (
          <Spin
            className="loading-gif d-flex justify-content-center pt-2"
            size="large"
          />
        ) : (
          <div>
            <div className="fixed-top">{this.renderHeader()}</div>
            <div
              style={{
                marginTop: '5%',
              }}
            >
              {blocks.map((item) => this.renderBlocks(item))}
            </div>
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

  getComment: (eventId, pageNumber, numberRecord) =>
    dispatch(eventActions.getComment(eventId, pageNumber, numberRecord)),

  handleGetEventInfo: (eventId, cb) =>
    dispatch(eventActions.getEventInfoUsingID(eventId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
