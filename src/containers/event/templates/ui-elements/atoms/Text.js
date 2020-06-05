import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input } from 'antd';
import { EditFilled } from '@ant-design/icons';

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
      ? { ...style }
      : {
          ...TextState(this.props),
          focus: false,
        };
  }

  componentDidMount = () => {
    const { editable, child } = this.props;
    if (editable && !child) {
      this.handleStoreBlock();
    }
  };
  // common function

  onChangeValue(newValue, valueParam) {
    const { changeContent, handleChangeContent } = this.props;
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
      } else this.handleStoreBlock();
    }, 3000);
  }

  handleEditorChange = (content) => {
    const {
      handleOnChangeTextBlock,
      changeContent,
      handleChangeContent,
    } = this.props;

    this.setState({
      content,
    });

    setTimeout(() => {
      const value = {
        value: content,
        style: this.state,
      };
      if (handleOnChangeTextBlock) {
        handleOnChangeTextBlock(content);
      } else if (changeContent) {
        changeContent(value);
      } else if (handleChangeContent) {
        handleChangeContent(value);
      }
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

  collapseModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  render() {
    const { leftModal, child, editable, editUrl } = this.props;
    const {
      visible,
      content,
      margin,
      padding,
      background,
      fontSize,
      fonts,
      lineText,
      letterSpacing,
      textAlign,
      tranform,
      color,
      fontWeight,
      focus,
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
      fontFamily: fonts,
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: tranform,
      width: '100%',
      alignContent: 'center',
    };

    const inputStyle = {
      backgroundColor: 'none',
      background: background,
      border: 'none',
      color: color,

      fontWeight: fontWeight,
      fontSize: `${fontSize}px`,
      overflowY: 'hidden',
    };

    const editIconStyle = {
      fontSize: '18px',
      color: '#1890ff',
    };

    return (
      <div className=" child-block    d-flex text-block">
        {focus && editable ? (
          <TextArea
            autoSize
            value={content}
            style={{ ...inputStyle, ...divStyle }}
            onChange={(e) => this.handleEditorChange(e.target.value)}
          />
        ) : (
          <div onClick={this.onClick} style={{ ...divStyle, ...inputStyle }}>
            {content}
          </div>
        )}
        {child && (
          <EditFilled
            className="edit-text"
            style={editIconStyle}
            onClick={this.collapseModal}
          />
        )}

        {editable && !child && (
          <div className="ml-auto">
            <IconsHandle
              collapseModal={() => this.onChangeValue(!visible, 'visible')}
              handleDuplicate={this.handleDuplicate}
              handleDelete={this.handleDelete}
            />
          </div>
        )}
        {editable && (
          <Modal
            title="Text"
            visible={visible}
            onCancel={() => this.onChangeValue(!visible, 'visible')}
            width={500}
            className={
              leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
            }
            style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
            footer={[
              <Button
                key="ok"
                onClick={() => this.onChangeValue(!visible, 'visible')}
                type="primary"
              >
                OK
              </Button>,
            ]}
          >
            {!editUrl && (
              <div>
                <EditText
                  fonts={fonts}
                  fontSize={fontSize}
                  lineText={lineText}
                  letterSpacing={letterSpacing}
                  handleChangeFonts={(value) =>
                    this.onChangeValue(value, 'fonts')
                  }
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
                    this.onChangeValue(value, 'tranform')
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
