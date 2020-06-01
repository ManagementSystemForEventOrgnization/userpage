import React from 'react';
import { connect } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';

import { eventActions } from 'action/event.action';
import { blockList } from '../data/data';
import { exampleText } from './constants/atom.constant';

import { Input } from 'antd';
const { TextArea } = Input;

class DropContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropList: [...this.props.blocks],
      inputText: exampleText + exampleText + exampleText + exampleText,
    };
  }

  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     if (nextProps.blocks !== prevState.dropList) {
  //       return { dropList: nextProps.blocks };
  //     } else return null;
  //   }

  //   handleSetDropList = (dropList) => {
  //     const { storeBlocksWhenCreateEvent } = this.props;
  //     this.setState({ dropList });
  //     storeBlocksWhenCreateEvent(dropList);
  //   };

  renderEditedBlock = (item, match, editable) => {
    console.log(item);
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
    const { inputText } = this.state;
    const { match, editable, blocks, storeBlocksWhenCreateEvent } = this.props;
    const inputStyle = {
      backgroundColor: 'none',
      background: 'none',
    };

    const update = true;
    return (
      <div className="drop-container">
        <TextArea
          style={inputStyle}
          placeholder="Autosize height based on content lines"
          value={inputText}
          onChange={this.handleChangeTextArea}
          autoSize
        />
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
          //   list={dropList}
          //   setList={this.handleSetDropList}

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
