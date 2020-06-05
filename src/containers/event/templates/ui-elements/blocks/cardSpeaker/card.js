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

const height = 30;
const iconStyle = {
  fontSize: '20px',
};

class CardBlock extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props;
    this.state = state
      ? { ...state }
      : {
          ...SpeakerState(props),
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

  addCard = () => {
    let { list } = this.state;
    list.push({ ...list[list.length - 1], id: uuid() });
    this.setState({});
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

  renderList = (item) => {
    const { editable, type } = this.props;
    return (
      <div
        key={item.id}
        className={type === 1 ? 'col-md-3 col-sm-3 mt-2 mb-2' : 'mr-2'}
      >
        <Card
          hoverable
          style={{ height: 300 }}
          cover={
            <Image
              url={item.url}
              editable={editable}
              height={height}
              child={true}
              handleChangeItem={(value) => {
                this.handleChangeItem(item.id, 'url', value);
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
                newStyle={{
                  fontWeight: 'bold',
                }}
                handleChangeItem={(value) => {
                  this.handleChangeItem(item.id, 'title', value);
                }}
              />
            }
            description={
              <Text
                content={item.description}
                child={true}
                editable={editable}
                handleChangeItem={(value) => {
                  this.handleChangeItem(item.id, 'description', value);
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
      <div className="d-flex  mt-3 mb-3">
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
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            deviceType={'desktop'}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {list.map((item) => this.renderList(item))}
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
