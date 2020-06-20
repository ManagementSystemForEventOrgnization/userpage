import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  PlusCircleTwoTone,
  MinusCircleTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';

import ImageBlock from '../../atoms/Image';
import TextBlock from '../../atoms/Text';
import { eventActions } from 'action/event.action';
// import { titleBlockStyle } from '../../../constants/atom.constant';

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
              url:
                'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658071/sponsor/hnkh_drqzna.png',
              id: uuid(),
            },
            {
              url:
                'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/hcmus_dvegyf.jpg',
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
            {
              id: uuid(),
              url:
                'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/apcs_xvnpbo.jpg',
            },
          ],
        };
  }

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

  handleDelete = () => {
    const { id, deleteBlock } = this.props;
    if (deleteBlock) {
      deleteBlock(id);
    }
  };

  render() {
    const style = {
      margin: '10px',
      padding: '10px',
    };
    const { sponsor } = this.state;
    const { editable } = this.props;
    const listSponsorStyle = {
      background: '#eaeaea6b',
      padding: '2%',
      marginBottom: '2%',
    };

    return (
      <div className="d-flex child-block" style={style}>
        <div style={style} className="container">
          <TextBlock
            content={title}
            child={true}
            editable={editable}
            newStyle={{
              fontWeight: 'normal',
              fontSize: 50,
            }}
          />

          <hr></hr>

          <div className=" d-flex">
            <div
              className="row d-flex justify-content-around mr-3"
              style={listSponsorStyle}
            >
              {sponsor.map((item) => (
                <div className="col-sm-2 mt-2  " key={item.id}>
                  <ImageBlock
                    url={item.url}
                    editable={editable}
                    height={high}
                    // borderRadius={true}
                    child={true}
                  />
                </div>
              ))}
            </div>

            {editable && (
              <div className="icons-handle ml-auto">
                <PlusCircleTwoTone
                  style={iconStyle}
                  className="mt-1"
                  onClick={this.addPhoto}
                />
                <MinusCircleTwoTone
                  style={iconStyle}
                  className="mt-2"
                  onClick={this.removePhoto}
                />

                <DeleteTwoTone
                  className="mt-2"
                  onClick={this.handleDelete}
                  style={iconStyle}
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
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor1Block);
