import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

import Text from '../../atoms/Text';
import Image from '../../atoms/Image';
import { eventActions } from 'action/event.action';
const { Meta } = Card;

const title = 'Card title';
const description = 'This is description';
const urlCardImage =
  'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg';
const height = 30;
const iconStyle = {
  fontSize: '20px',
};

class CardBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      list: [1, 2, 3, 4],
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
    list.push(list.length + 1);
    this.setState({ list });
    this.handleStoreBlock();
  };

  removeCard = () => {
    let { list } = this.state;
    list.pop(list.length - 1);
    this.setState({ list });
    this.handleStoreBlock();
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

  render() {
    const { list } = this.state;
    const { editable } = this.props;
    return (
      // need to map style
      <div className="d-flex">
        <div className="row">
          {list.map((item) => (
            <div className="col-sm-3">
              <Card
                hoverable
                style={{ height: 300 }}
                cover={
                  <Image url={urlCardImage} editable={true} height={height} />
                }
              >
                <Meta
                  title={<Text content={title} child={true} />}
                  description={<Text content={description} child={true} />}
                />
              </Card>
            </div>
          ))}
        </div>
        {editable && (
          <div className="icons-handle">
            <PlusCircleTwoTone
              style={iconStyle}
              className="mt-3"
              onClick={this.addCard}
            />
            <MinusCircleTwoTone
              style={iconStyle}
              className="mt-3"
              onClick={this.removeCard}
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
});
export default connect(mapStateToProps, mapDispatchToProps)(CardBlock);
