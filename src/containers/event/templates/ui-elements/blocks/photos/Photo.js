import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  PlusCircleTwoTone,
  MinusCircleTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import { v4 as uuid } from 'uuid';

import ImageBlock from '../../atoms/Image';
import { eventActions } from 'action/event.action';

const high = 42;
const iconStyle = {
  fontSize: '20px',
};

class Photo extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style }
      : {
          margin: [1, 1, 1, 1],
          padding: [1, 1, 1, 1],
          list: [
            {
              url: 'bg-1.jpg',
              id: uuid(),
            },
            {
              url: 'bg-2.jpg',
              id: uuid(),
            },
            {
              url: 'bg-3.jpg',
              id: uuid(),
            },
            {
              url: 'star.jpg',
              id: uuid(),
            },
          ],
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

  addPhoto = () => {
    let { list } = this.state;
    list.push({ ...list[list.length - 1], id: uuid() });
    this.setState({
      list,
    });
    setTimeout(this.handleStoreBlock(), 3000);
  };

  removePhoto = () => {
    let { list } = this.state;
    list.pop();
    this.setState({ list });
    setTimeout(this.handleStoreBlock(), 3000);
  };

  handleStoreBlock = () => {
    const { blocks, storeBlocksWhenCreateEvent, id } = this.props;
    const currentStyle = this.state;

    let item = blocks.find((ele) => ele.id === id);

    if (item) {
      const index = blocks.indexOf(item);
      item.style = currentStyle;
      storeBlocksWhenCreateEvent([
        ...blocks.slice(0, index),
        item,
        ...blocks.slice(index + 1, blocks.length),
      ]);
    }
  };

  deleteBlock = () => {
    const { id, deleteBlock } = this.props;
    if (deleteBlock) {
      deleteBlock(id);
    }
  };

  render() {
    const { margin, padding, list } = this.state;
    const { editable } = this.props;

    const style = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
    };

    return (
      <div className="d-flex child-block" style={style}>
        <div className="row d-flex justify-content-around">
          {list.map((item) => (
            <div className="col-sm-3" key={item.id}>
              <ImageBlock
                url={item.url}
                height={high}
                leftModal={true}
                child={true}
              />
            </div>
          ))}
        </div>

        {editable && (
          <div className="icons-handle ml-auto">
            <PlusCircleTwoTone
              style={iconStyle}
              className="mt-2"
              onClick={this.addPhoto}
            />
            <MinusCircleTwoTone
              style={iconStyle}
              className="mt-2"
              onClick={this.removePhoto}
            />

            <DeleteTwoTone
              style={iconStyle}
              className="mt-2"
              onClick={this.deleteBlock}
            />
          </div>
        )}
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
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
