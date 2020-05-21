import React from 'react';
import { connect } from 'react-redux';

import { eventActions } from 'action/event.action';
import { blockList } from './data/data';

class PreviewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const { id, getEventDetail } = this.props;
    const eventId = id ? id : '5eb259b562bd742fe41c1205'; // should get id from url
    getEventDetail(eventId);
  };

  renderBlocks = (item) => {
    const { match } = this.props;
    const param = item.style
      ? {
          id: item.id,
          style: item.style,
          editable: true,
          match,
        }
      : {
          id: item.id,
          editable: true,
          match,
        };

    return blockList[item.type](param);
  };

  render() {
    const { blocks } = this.props;

    return <div>{blocks.map((item) => this.renderBlocks(item))}</div>;
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  id: state.event.id,
  page: state.event.page,
  dropContainerHtml: state.event.dropContainerHtml,
});

const mapDispatchToProps = (dispatch) => ({
  getEventDetail: (eventId) => dispatch(eventActions.getEventDetail(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewEvent);
