import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

import ImageBlock from '../../atoms/Image';
import TextBlock from '../../atoms/Text';
import { eventActions } from 'action/event.action';

const high = 20;
const title = 'Sponsor';
const iconStyle = {
  fontSize: '20px',
};

class Sponsor1Block extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          sponsor: [
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
            {
              id: uuid(),
              url: 'star1.jpg',
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
    const { sponsor } = this.state;
    this.setState({
      sponsor: sponsor.push({ ...sponsor[sponsor.length - 1], id: uuid() }),
    });
    this.handleStoreBlock();
  };

  removePhoto = () => {
    const { sponsor } = this.state;
    this.setState({
      sponsor: sponsor.pop(),
    });
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
    const style = {
      margin: '10px',
      padding: '10px',
    };
    const { sponsor } = this.state;
    const { editable } = this.props;

    return (
      <div className="d-flex child-block" style={style}>
        <div style={style} className="container">
          <TextBlock
            content={title}
            child={true}
            editable={editable}
            newStyle={{
              fontWeight: 'normal',
              fontSize: 60,
            }}
          />

          <hr></hr>

          <div className=" d-flex">
            <div className="row d-flex justify-content-around">
              {sponsor.map((item) => (
                <div className="col-sm-2 mt-2" key={item.id}>
                  <ImageBlock
                    url={item.url}
                    editable={editable}
                    height={high}
                    borderRadius={true}
                  />
                </div>
              ))}
            </div>

            {editable && (
              <div className="icons-handle">
                <PlusCircleTwoTone
                  style={iconStyle}
                  className="mt-3"
                  onClick={this.addPhoto}
                />
                <MinusCircleTwoTone
                  style={iconStyle}
                  className="mt-3"
                  onClick={this.removePhoto}
                />
              </div>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor1Block);
