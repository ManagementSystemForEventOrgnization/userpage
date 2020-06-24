import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { MailTwoTone, PhoneTwoTone } from '@ant-design/icons';

import Text from '../../atoms/Text';
import { eventActions } from 'action/event.action';
import IconsHandle from '../../shares/IconsHandle';
import PaddingAndMargin from '../../shares/PaddingAndMargin';
import ChangeColorModal from '../../shares/ChangeColorModal';

class ContactUs2 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style, isCollapsed: false }
      : {
          margin: [1, 1, 1, 1],
          padding: [1, 1, 1, 1],
          textAlign: 'center',
          email: {
            value: '1612xxx@student.hcmus.edu.vn',
            style: { textAlign: 'center' },
          },
          phone: {
            value: '0203040506080',
            style: { textAlign: 'center' },
          },
          isCollapsed: false,
          color: '',
          background: 'none',
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

  collapseModal = () => {
    const { isCollapsed } = this.state;
    this.setState({
      isCollapsed: !isCollapsed,
    });
  };

  onChangeValue = (value, type) => {
    this.setState({
      [type]: value,
    });

    setTimeout(this.handleStoreBlock(), 2000);
  };

  render() {
    const { editable } = this.props;
    const {
      margin,
      padding,
      textAlign,
      phone,
      email,
      isCollapsed,
      color,
      background,
    } = this.state;

    const iconStyle = {
      fontSize: '40px',
      color: `${color}`,
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
      textAlign,
      color,
      background,
    };

    return (
      <div className="child-block d-flex" style={blockStyle}>
        <div className="row flex-fill">
          <div className="col-6 col-sm-6">
            <MailTwoTone style={iconStyle} />
            <Text
              child={true}
              content={email.value}
              newStyle={email.style}
              editable={editable}
              handleChangeContact={(value) =>
                this.onChangeValue(value, 'email')
              }
            />
          </div>
          <div className="col-6 col-sm-6">
            <PhoneTwoTone style={iconStyle} />
            <Text
              child={true}
              content={phone.value}
              newStyle={phone.style}
              leftModal={true}
              editable={editable}
              handleChangeContact={(value) =>
                this.onChangeValue(value, 'phone')
              }
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

        <Modal
          title="Edit Contact Style"
          visible={isCollapsed}
          onOk={this.collapseModal}
          onCancel={this.collapseModal}
          width="500px"
        >
          <PaddingAndMargin
            padding={padding}
            margin={margin}
            handleChangeMargin={(value) => this.onChangeValue(value, 'margin')}
            handleChangePadding={(value) =>
              this.onChangeValue(value, 'padding')
            }
          />

          <div className="d-flex mt-5 pl-2">
            <ChangeColorModal
              title="Change Text Color"
              color={color}
              handleChangeColor={(value) => this.onChangeValue(value, 'color')}
            />
            <ChangeColorModal
              title="Change background"
              color={background}
              handleChangeColor={(value) =>
                this.onChangeValue(value, 'background')
              }
            />
          </div>
        </Modal>
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
