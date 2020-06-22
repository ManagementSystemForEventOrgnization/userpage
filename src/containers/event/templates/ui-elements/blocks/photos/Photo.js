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

const height = 42;
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
              url:
                'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658071/sponsor/hnkh_drqzna.png',
              id: uuid(),
            },

            {
              url:
                'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/git_vumynk.png',
              id: uuid(),
            },

            {
              url:
                'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/fit_baduky.png',
              id: uuid(),
            },
            {
              id: uuid(),
              url:
                'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/dhqg_bq799b.png',
            },
          ],
        };
  }

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

  handleChangeUrlUpload = (itemId, type, value) => {
    let { list } = this.state;
    const index = list.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      list[index][type] = value;
    }
    this.setState({ list });
    this.handleStoreBlock();
  };

  renderList = (item) => {
    const { editable } = this.props;

    return (
      <div key={item.id} className="col-md-6 col-sm-6 mt-1 mb-2 p-1">
        <ImageBlock
          url={item.url}
          editable={editable}
          child={true}
          height={height}
          handleChangeItemGallery={(value) => {
            this.handleChangeUrlUpload(item.id, 'url', value);
          }}
        />
      </div>
    );
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
      background: '#eaeaea6b',
    };

    return (
      <div className="d-flex child-block p-5" style={style}>
        <div className="row d-flex justify-content-around ">
          {list.map((item) => this.renderList(item))}
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
