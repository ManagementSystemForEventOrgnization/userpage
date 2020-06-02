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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.blocks !== prevState.dropList) {
      return { dropList: nextProps.blocks };
    } else return null;
  }

  handleSetDropList = (dropList) => {
    const { storeBlocksWhenCreateEvent } = this.props;
    this.setState({ dropList });
    storeBlocksWhenCreateEvent(dropList);
  };

  renderItem = (item, match, editable, update) => {
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

    return update ? blockList[item.type](param) : item.options(param);
  };

  handleChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { dropList } = this.state;
    const { match, editable, update, blocks } = this.props;

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
          delay={3}
          list={dropList}
          setList={this.handleSetDropList}
        >
          {blocks.map((item) => this.renderItem(item, match, editable, update))}
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
