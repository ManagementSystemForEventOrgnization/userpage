import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MailTwoTone, PhoneTwoTone } from '@ant-design/icons';

import Text from '../../atoms/Text';
import { eventActions } from 'action/event.action';
import IconsHandle from '../../shares/IconsHandle';

class ContactUs2 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          margin: [1, 1, 1, 1],
          padding: [1, 1, 1, 1],
          textAlign: 'center',
        };
  }

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

  handleDuplicate = () => {
    const { id, duplicateBlock } = this.props;
    if (duplicateBlock) {
      duplicateBlock(id);
    }
  };

  handleDelete = () => {
    const { id, deleteBlock } = this.props;
    if (deleteBlock) {
      deleteBlock(id);
    }
  };

  render() {
    const { editable } = this.props;
    const { margin, padding, textAlign } = this.state;
    const iconStyle = {
      fontSize: '40px',
    };

    const textStyle = {
      textAlign: 'center',
    };

    const blockStyle = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
      textAlign: textAlign,
    };

    return (
      <div className="child-block d-flex" style={blockStyle}>
        <div className="row flex-fill">
          <div className="col-6 col-sm-6">
            <MailTwoTone style={iconStyle} />
            <Text
              child={true}
              content="123@123.com.vn"
              newStyle={textStyle}
              editable={editable}
            />
          </div>
          <div className="col-6 col-sm-6">
            <PhoneTwoTone style={iconStyle} />
            <Text
              child={true}
              content="0123456789"
              newStyle={textStyle}
              leftModal={true}
              editable={editable}
            />
          </div>
        </div>

        {editable && (
          <div className="ml-auto">
            <IconsHandle
              collapseModal={this.collapseModal}
              handleDuplicate={this.handleDuplicate}
              handleDelete={this.handleDelete}
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
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs2);
