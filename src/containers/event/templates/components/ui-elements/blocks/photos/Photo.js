import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons';

import ImageBlock from '../../atoms/Image';
import { eventActions } from '../../../../../../../action/event.action';

const high = 42;
const iconStyle = {
  fontSize: '20px',
};
const urlDefault =
  'https://easydrawingart.com/wp-content/uploads/2019/07/How-to-Draw-a-Chibi-Girl.jpg';

class Photo extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style }
      : {
          margin: [1, 1, 1, 1],
          padding: [1, 1, 1, 1],
          list: [1, 2, 3, 4],
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
    list.push(list.length + 1);
    this.setState({
      list,
    });
    this.handleStoreBlock();
  };

  removePhoto = () => {
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
        <div className="row">
          {list.map((item) => (
            <div className="col-sm-3" key={item}>
              <ImageBlock url={urlDefault} height={high} leftModal={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
