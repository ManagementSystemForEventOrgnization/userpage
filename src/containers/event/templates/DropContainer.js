import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

import { eventActions } from 'action/event.action';
import { blockList } from '../data/data';

class DropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: [...this.props.blocks],
    };
  }

  renderItem = (item, match, editable) => {
    const param =
      item.style && Object.keys(item.style).length !== 0
        ? {
            id: item.id,
            key: item.id,
            style: item.style,
            editable,
            match,
            type: item.type,
          }
        : {
            id: item.id,
            editable,
            key: item.id,
            match,
            type: item.type,
          };

    return blockList[item.type](param);
  };

  render() {
    const { match, editable, blocks, storeBlocksWhenCreateEvent } = this.props;
    return (
      <div className="drop-container pl-5 pr-5">
        <ReactSortable
          id="drop-container"
          sort={true}
          group={{
            name: 'shared',
            pull: true,
            put: true,
          }}
          // animation={300}
          delayOnTouchStart={true}
          delay={300}
          list={blocks}
          setList={storeBlocksWhenCreateEvent}
        >
          {blocks.map((item) => this.renderItem(item, match, editable))}
        </ReactSortable>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropContainer);
