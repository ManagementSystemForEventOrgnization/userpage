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

  renderEditedBlock = (item, match, editable) => {
    const param =
      Object.keys(item.style).length !== 0
        ? {
            id: item.id,
            style: item.style,
            editable,
            match,
          }
        : {
            id: item.id,
            editable,
            match,
          };

    return blockList[item.type](param);
  };

  renderBlock = (item, match, editable) => {
    console.log('before ', item);
    return item.options({
      id: item.id,
      key: item.id,
      editable,
      match,
      type: item.type,
    });
  };

  handleChangeTextArea = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  render() {
    const { match, editable, blocks, storeBlocksWhenCreateEvent } = this.props;

    const update = true;
    return (
      <div className="drop-container">
        <ReactSortable
          id="drop-container"
          sort={true}
          group={{
            name: 'shared',
            pull: true,
            put: true,
          }}
          animation={300}
          delayOnTouchStart={true}
          delay={200}
          list={blocks}
          setList={storeBlocksWhenCreateEvent}
        >
          {update
            ? blocks.map((item) =>
                this.renderEditedBlock(item, match, editable)
              )
            : blocks.map((item) => this.renderBlock(item, match, editable))}
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

  getEventEdit: (id, route) => dispatch(eventActions.getEventEdit(id, route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropContainer);
