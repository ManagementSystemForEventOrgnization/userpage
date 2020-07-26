import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import EditText from '../shares/EditText';
import PaddingAndMargin from '../shares/PaddingAndMargin';
import ChangeColorModal from '../shares/ChangeColorModal';
import IconsHandle from '../shares/IconsHandle';

import { TextState } from '../stateInit/TextState';
import { eventActions } from 'action/event.action';

const { TextArea } = Input;
class TextsBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style, focus: false, visible: false }
      : {
          ...TextState(this.props),
          focus: false,
          visible: false,
        };
  }

  onChangeValue(newValue, valueParam) {
    const {
      changeContent,
      handleChangeContent,
      handleChangeItem,
      handleChangeSponsor,
      handleChangeContact,
      handleChangeFooter,
    } = this.props;
    this.setState({
      [valueParam]: newValue,
    });

    setTimeout(() => {
      const value = {
        value: this.state.content,
        style: this.state,
      };
      if (changeContent) {
        changeContent(value);
      } else if (handleChangeContent) {
        handleChangeContent(value);
      } else if (handleChangeItem) {
        handleChangeItem(value);
      } else if (handleChangeSponsor) {
        handleChangeSponsor(value);
      } else if (handleChangeContact) {
        handleChangeContact(value);
      } else if (handleChangeFooter) {
        handleChangeFooter(value);
      }
    }, 2000);
  }

  handleEditorChange = (content) => {
    const {
      handleOnChangeTextBlock,
      changeContent,
      handleChangeContent,
      handleChangeItem,
      handleChangeSponsor,
      handleChangeContact,
      handleChangeFooter,
      handleChangeSchedule,
    } = this.props;

    this.setState({
      content,
    });

    setTimeout(() => {
      const value = {
        value: content,
        style: this.state,
      };

      if (handleChangeSponsor) {
        handleChangeSponsor(value);
      } else if (handleChangeContact) {
        handleChangeContact(value);
      } else if (handleOnChangeTextBlock) {
        handleOnChangeTextBlock(content);
      } else if (changeContent) {
        changeContent(value);
      } else if (handleChangeContent) {
        handleChangeContent(value);
      } else if (handleChangeItem) {
        handleChangeItem(value);
      } else if (handleChangeFooter) {
        handleChangeFooter(value);
      } else if (handleChangeSchedule) {
        handleChangeSchedule(content);
      } else this.handleStoreBlock();
    }, 3000);
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

  onClick = () => {
    this.setState({
      focus: true,
    });
  };

  openModal = () => {
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
    this.handleStoreBlock();
  };

  getCustomStyle = () => {
    const {
      margin,
      padding,
      background,
      fontSize,
      lineText,
      letterSpacing,
      textAlign,
      transform,
      color,
      fontWeight,
    } = this.state;
    const divStyle = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: transform,
      width: '100%',
      alignContent: 'center',
      color,
      fontWeight,
      fontSize: `${fontSize}px`,
      background,
    };

    return divStyle;
  };

  getInputStyle = () => {
    const { background, color, fontWeight, fontSize } = this.state;

    const inputStyle = {
      background,
      border: 'none',
      color: color,

      fontWeight,
      fontSize: `${fontSize}px`,
      overflowY: 'hidden',
    };
    return inputStyle;
  };

  render() {
    const {
      leftModal,
      child,
      editable,
      editUrl,
      newStyle,
      id,
      footer,
    } = this.props;
    const {
      visible,
      content,
      margin,
      padding,
      background,
      fontSize,
      lineText,
      letterSpacing,
      color,
      focus,
    } = this.state;

    const divStyle = this.getCustomStyle();
    const inputStyle = this.getInputStyle();
    const editIconStyle = {
      fontSize: '18px',
      color: '#1890ff',
    };

    return (
      <div className=" child-block    d-flex text-block" key={id}>
        {focus && editable ? (
          <TextArea
            autoSize
            value={content}
            style={{ ...inputStyle, ...divStyle, ...newStyle }}
            onChange={(e) => this.handleEditorChange(e.target.value)}
          />
        ) : footer && !editable ? (
          <Link to="/" style={{ ...divStyle, ...inputStyle, ...newStyle }}>
            <p>{content}</p>
          </Link>
        ) : (
          <p
            onClick={this.onClick}
            style={{ ...divStyle, ...inputStyle, ...newStyle }}
          >
            {content}
          </p>
        )}

        {child && editable && (
          <EditFilled
            className="edit-text"
            style={editIconStyle}
            onClick={this.openModal}
          />
        )}

        {editable && !child && (
          <IconsHandle
            collapseModal={this.openModal}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}

        {editable && (
          <Modal
            title="Text"
            visible={visible}
            onCancel={this.closeModal}
            width={500}
            className={
              leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
            }
            //  style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
            footer={[
              <Button key="ok" onClick={this.closeModal} type="primary">
                OK
              </Button>,
            ]}
          >
            {!editUrl && (
              <div>
                <EditText
                  fontSize={fontSize}
                  lineText={lineText}
                  letterSpacing={letterSpacing}
                  handleChangeFontSize={(value) =>
                    this.onChangeValue(value, 'fontSize')
                  }
                  handleChangeLetterSpacing={(value) =>
                    this.onChangeValue(value, 'letterSpacing')
                  }
                  handleChangeLineHeight={(value) =>
                    this.onChangeValue(value, 'lineText')
                  }
                  handleChangeTextAlign={(value) =>
                    this.onChangeValue(value, 'textAlign')
                  }
                  handleChangeTextTranform={(value) =>
                    this.onChangeValue(value, 'transform')
                  }
                />

                <div className="mt-5 pl-2">
                  <PaddingAndMargin
                    padding={padding}
                    margin={margin}
                    handleChangeMargin={(value) =>
                      this.onChangeValue(value, 'margin')
                    }
                    handleChangePadding={(value) =>
                      this.onChangeValue(value, 'padding')
                    }
                  />
                </div>
                <div className="d-flex mt-5 pl-2">
                  <ChangeColorModal
                    title="Change Text Color"
                    color={color}
                    handleChangeColor={(value) =>
                      this.onChangeValue(value, 'color')
                    }
                  />
                  <ChangeColorModal
                    title="Change background"
                    color={background}
                    handleChangeColor={(value) =>
                      this.onChangeValue(value, 'background')
                    }
                  />
                </div>
              </div>
            )}
          </Modal>
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
  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextsBlock);
