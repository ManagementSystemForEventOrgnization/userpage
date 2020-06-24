import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { v4 as uuid } from 'uuid';

import {
  PlusCircleTwoTone,
  MinusCircleTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import Carousel from 'react-multi-carousel';

import Text from '../../atoms/Text';
import Image from '../../atoms/Image';
import { eventActions } from 'action/event.action';
import { responsive } from '../../../constants/atom.constant';
import SpeakerState from '../../stateInit/SpeakerState';
const { Meta } = Card;

const height = 50;
const iconStyle = {
  fontSize: '20px',
};

class CardBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...SpeakerState(props),
        };
  }

  addCard = () => {
    let { list } = this.state;
    list.push({ ...list[list.length - 1], id: uuid() });
    this.setState({ list });
    setTimeout(this.handleStoreBlock(), 3000);
  };

  removeCard = () => {
    let { list } = this.state;
    list.pop();
    this.setState({ list });
    setTimeout(this.handleStoreBlock(), 3000);
  };

  handleDelete = () => {
    const { id, deleteBlock } = this.props;
    if (deleteBlock) {
      deleteBlock(id);
    }
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

  handleChangeUrlUpload = (itemId, type, value) => {
    let { list } = this.state;
    const index = list.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      list[index][type] = value;
    }
    this.setState({ list });
    this.handleStoreBlock();
  };

  handleChangeItem = (itemId, type, value) => {
    let { list } = this.state;
    const index = list.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      list[index][type] = value.value;
    }

    this.setState({ list, [type]: value.style });
    this.handleStoreBlock();
  };

  renderImage = (item) => {
    const { editable } = this.props;

    return (
      <div key={item.id}>
        <Image
          url={item.url}
          editable={editable}
          child={true}
          height={'50vh'}
          handleChangeItem={(value) => {
            this.handleChangeUrlUpload(item.id, 'url', value);
          }}
        />
      </div>
    );
  };

  renderList = (item) => {
    const { editable, type } = this.props;
    const { title } = this.state;

    return (
      <div
        key={item.id}
        className={
          type === 1 ? 'col-md-3 col-sm-3 mt-5 mb-2 p-2' : 'mr-4 mt-5 mb-2 p-2'
        }
      >
        <Card
          hoverable
          style={{ height: 'auto' }}
          cover={
            <Image
              url={item.url}
              editable={editable}
              child={true}
              height={height}
              handleChangeItem={(value) => {
                this.handleChangeUrlUpload(item.id, 'url', value);
              }}
            />
          }
        >
          <Meta
            title={
              <Text
                content={item.title}
                child={true}
                editable={editable}
                newStyle={{ ...title }}
                handleChangeItem={(value) => {
                  this.handleChangeItem(item.id, 'title', value);
                }}
              />
            }
          />
        </Card>
      </div>
    );
  };

  render() {
    const { list } = this.state;
    const { editable, type } = this.props;
    return (
      // need to map style

      <div className="d-flex  mt-3 mb-3 p-2">
        {type === 1 ? (
          <div className="row d-flex justify-content-around child-block">
            {list.map((item) => this.renderList(item))}
          </div>
        ) : (
          <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={2000}
            customTransition="all .5"
            containerClass="carousel-container  "
            removeArrowOnDeviceType={['tablet', 'mobile']}
            deviceType={'desktop'}
            itemClass="item-image mr-2 "
          >
            {list.map((item) => this.renderImage(item))}
          </Carousel>
        )}

        {editable && (
          <div className="icons-handle ml-auto">
            <PlusCircleTwoTone
              style={iconStyle}
              className="mt-2"
              onClick={this.addCard}
            />
            <MinusCircleTwoTone
              style={iconStyle}
              className="mt-2"
              onClick={this.removeCard}
            />

            <DeleteTwoTone
              style={iconStyle}
              className="mt-2"
              onClick={this.handleDelete}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CardBlock);
