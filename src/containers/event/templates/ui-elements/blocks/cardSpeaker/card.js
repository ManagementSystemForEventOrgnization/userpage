import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { v4 as uuid } from 'uuid';

import {
  PlusCircleTwoTone,
  MinusCircleTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';

import Text from '../../atoms/Text';
import Image from '../../atoms/Image';
import { eventActions } from 'action/event.action';
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
          visible: false,
          list: [
            {
              id: uuid(),
              title: "Speaker's name",
              description: 'This is description of speaker',
              url:
                'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg',
            },
            {
              id: uuid(),
              title: "Speaker's name",
              description: 'This is description of speaker',
              url:
                'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg',
            },
            {
              id: uuid(),
              title: "Speaker's name",
              description: 'This is description of speaker',
              url:
                'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg',
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

  render() {
    const { list } = this.state;
    const { editable } = this.props;
    return (
      // need to map style
      <div className="d-flex">
        <div className="row d-flex justify-content-around">
          {list.map((item) => (
            <div className="col-sm-3 mt-2" key={item.id}>
              <Card
                hoverable
                style={{ height: 300 }}
                cover={
                  <Image
                    url={item.url}
                    editable={editable}
                    height={height}
                    child={true}
                  />
                }
              >
                <Meta
                  title={
                    <Text
                      content={item.title}
                      child={true}
                      newStyle={{
                        fontWeight: 'bold',
                      }}
                    />
                  }
                  description={<Text content={item.description} child={true} />}
                />
              </Card>
            </div>
          ))}
        </div>
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
