import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

import { eventActions } from '../../../../action/event.action';
import dataTest from '../data/dataTest';

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

  render() {
    const { dropList } = this.state;
    const eventName = 'Conference';
    return (
      <div className="drop-container">
        <ReactSortable
          className="drop-container"
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
          {dropList.map((item, index) => {
            return item.options({
              key: index,
              id: item.id,
              editable: true,
            });
          })}
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
