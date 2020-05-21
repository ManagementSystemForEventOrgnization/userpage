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
    // return callBack(param, blockList[item.type]);
    return blockList[item.type](param);
  };

  callBackFunction = (params, callBack) => {
    if (!callBack) return;
    callBack(params);
  };

  render() {
    const { dropList } = this.state;
    const { match, editable, update, blocks } = this.props;

    return (
      <div className="drop-container">
        {/* <Comment /> */}
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
          {update
            ? blocks.map((item) => this.renderBlocks(item))
            : dropList.map((item) => {
                return item.options({
                  id: item.id,
                  editable: editable,
                  match,
                  type: item.type,
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

  getEventEdit: (id, route) => dispatch(eventActions.getEventEdit(id, route)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropContainer);
