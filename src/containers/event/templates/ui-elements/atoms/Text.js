import React from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Modal, Tabs, Button } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

import EditText from '../shares/EditText';
import PaddingAndMargin from '../shares/PaddingAndMargin';
import ChangeColorModal from '../shares/ChangeColorModal';
import IconsHandle from '../shares/IconsHandle';

import { TabPane } from '../../constants/atom.constant';
import { TextState } from '../stateInit/TextState';
import { eventActions } from 'action/event.action';

class TextsBlock extends React.Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...TextState(this.props),
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };
  // common function

  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    setTimeout(this.handleStoreBlock(), 3000);
  }

  handleEditorChange = (content) => {
    const { handleOnChangeTextBlock } = this.props;
    this.setState({ content });
    setTimeout(this.handleStoreBlock(), 3000);

    if (handleOnChangeTextBlock) {
      handleOnChangeTextBlock(
        content ? ReactHtmlParser(content)[0].props.children[0] : ''
      );
    }
  };

  onChangeUrl = (value) => {
    const { handleChangeUrl } = this.props;
    if (handleChangeUrl) {
      handleChangeUrl(value);
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
    const { key, leftModal, child, editable, editUrl } = this.props;
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
      color: color,
      // wordBreak: 'break-word',
      alignContent: 'center',
      background: background,
      fontSize: `${fontSize}px`,
      fontFamily: fonts,
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: tranform,
      fontWeight: fontWeight,
    };

    return (
      <div className="edittext child-block  d-flex" style={divStyle}>
        <div
          key={key}
          onClick={child ? () => this.onChangeValue(true, 'visible') : () => {}}
        >
          {content ? ReactHtmlParser(content) : ''}
        </div>
        {editable && !child && (
          <IconsHandle
            collapseModal={() => this.onChangeValue(!visible, 'visible')}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
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
            <Tabs defaultActiveKey="1">
              <TabPane tab="text " key="1">
                <h6>Nội dung</h6>
                <Editor
                  value={content}
                  onEditorChange={this.handleEditorChange}
                  style={divStyle}
                  apiKey="6vfxhgd1k6ab1xopelmn5p5nygco7vcmx1c5sl6nu4w8bwun"
                  init={{
                    plugins: 'link   ',
                    toolbar:
                      'undo redo | bold italic underline | alignleft aligncenter alignright insert link format textcolor  | code',
                  }}
                />
              </TabPane>

              {!editUrl && (
                <TabPane tab="design " key="2">
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
                </TabPane>
              )}
            </Tabs>
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
