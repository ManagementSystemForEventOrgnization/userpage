import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Row, Col, Modal } from 'antd';
import { PlusCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';

import EditText from '../../shares/EditText';
import IconsHandle from '../../shares/IconsHandle';
import TextsBlock from '../../atoms/Text';
import { eventActions } from '../../../../../../../action/event.action';

class Scheduel1 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style }
      : {
          visible: false,
          txtTime: '',
          txtTitle: '',
          txtDescription: '',
          margin: [0, 0, 0, 0],
          padding: [0, 0, 0, 0],
          background: 'white',
          fontSize: 20,
          fonts: 'Times New Roman',
          lineText: 80,
          letterSpacing: 0,
          textAlign: '',
          tranform: ' ',
          color: 'black',
          ScheduelName: 'Schedule',

          scheduelText: [
            {
              id: 1,
              time: '8 : 00 AM',
              title: ' Coffee & Conversation',
              description:
                'Coffee is usually brewed immediately before drinking. In most areas, coffee may be purchased unprocessed, or already roasted, or already',
            },
            {
              id: 2,
              time: '8 : 00 AM',
              title: ' Coffee & Conversation',
              description:
                'Coffee is usually brewed immediately before drinking. In most areas, coffee may be purchased unprocessed, or already roasted, or already',
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

  //show modal
  showModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  };

  onClickAddScheduel = (id) => {
    const { scheduelText } = this.state;
    const item = scheduelText.find((ele) => ele.id === id);
    // const index = scheduelText.indexOf(item);

    scheduelText.push({
      id: uuid(),
      time: item.time,
      title: item.title,
      description: item.description,
    });
    this.setState({
      scheduelText,
    });
  };
  handleChangeFonts = (value) => {
    this.setState({
      fonts: value,
    });
  };

  handleChangeFontSize = (value) => {
    this.setState({
      fontSize: value,
    });
    console.log(this.state.fontSize);
  };
  handleChangeLetterSpacing = (value) => {
    this.setState({
      letterSpacing: value,
    });
  };
  handleChangeLineHeight = (value) => {
    this.setState({
      lineText: value,
    });
  };

  handleChangeTextAlign = (value) => {
    this.setState({
      textAlign: value,
    });
  };

  handleChangeTextTranform = (value) => {
    this.setState({
      tranform: value,
    });
  };
  handleChangeTextColor = (value) => {
    this.setState({
      color: value,
    });
  };

  handleChangeBackground = (value) => {
    this.setState({
      background: value,
    });
  };

  handleChangeMargin = (value) => {
    this.setState({
      margin: value,
    });
  };

  handleChangePadding = (value) => {
    this.setState({
      padding: value,
    });
  };

  removeOption = (scheduel) => {
    const scheduelText = this.state.scheduelText.filter(
      (e) => e.id !== scheduel.id
    );
    this.setState({
      scheduelText,
    });
  };

  handleOnChangeTextBlock = (id, value) => {
    const { scheduelText } = this.state;
    const item = scheduelText.find((ele) => ele.id === id);
    const index = scheduelText.indexOf(item);
    item.time = value;
    if (index === -1) return;
    else {
      this.setState({
        scheduelText: [
          ...scheduelText.slice(0, index),
          item,
          ...scheduelText.slice(index + 1, scheduelText.length),
        ],
      });
    }
  };
  handleOnChangeTitleTextBlock = (id, value) => {
    const { scheduelText } = this.state;
    const item = scheduelText.find((ele) => ele.id === id);
    const index = scheduelText.indexOf(item);
    item.title = value;
    if (index === -1) return;
    else {
      this.setState({
        scheduelText: [
          ...scheduelText.slice(0, index),
          item,
          ...scheduelText.slice(index + 1, scheduelText.length),
        ],
      });
    }
  };
  handleOnChangeDesTextBlock = (id, value) => {
    const { scheduelText } = this.state;
    const item = scheduelText.find((ele) => ele.id === id);
    const index = scheduelText.indexOf(item);
    item.description = value;
    if (index === -1) return;
    else {
      this.setState({
        scheduelText: [
          ...scheduelText.slice(0, index),
          item,
          ...scheduelText.slice(index + 1, scheduelText.length),
        ],
      });
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
    // need to refactor
    const {
      scheduelText,
      margin,
      padding,
      background,
      fontSize,
      fonts,
      lineText,
      letterSpacing,
      color,
      textAlign,
      tranform,
      ScheduelName,
    } = this.state;
    const { editable } = this.props;
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
      wordBreak: 'break-word',
      alignContent: 'center',
      background: background,
      fontSize: `${fontSize}px`,
      fontFamily: fonts,
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: tranform,
    };

    return (
      <div className="child-block ">
        <TextsBlock content={ScheduelName} />
        <div className="d-flex">
          <div style={divStyle}>
            {scheduelText.map((scheduel, index) => (
              <div className="child-block">
                {editable && (
                  <div>
                    <PlusCircleTwoTone
                      className="ml-1 "
                      onClick={() => this.onClickAddScheduel(scheduel.id)}
                    />
                    <DeleteTwoTone
                      className="ml-3 "
                      onClick={() => this.removeOption(scheduel)}
                    />
                  </div>
                )}

                <Row key={index} className="mt-4">
                  <Col span={18} push={6}>
                    <TextsBlock
                      id={scheduel.id}
                      editable={editable}
                      content={scheduel.title}
                      handleOnChangeTextBlock={
                        this.handleOnChangeTitleTextBlock
                      }
                    ></TextsBlock>

                    <div className="mt-3">
                      <TextsBlock
                        id={scheduel.id}
                        editable={editable}
                        handleOnChangeTextBlock={
                          this.handleOnChangeDesTextBlock
                        }
                        content={scheduel.description}
                      ></TextsBlock>
                    </div>
                  </Col>
                  <Col span={6} pull={18}>
                    <TextsBlock
                      content={scheduel.time}
                      id={scheduel.id}
                      editable={editable}
                      handleOnChangeTextBlock={this.handleOnChangeTextBlock}
                    ></TextsBlock>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
          {editable && (
            <IconsHandle
              collapseModal={this.showModal}
              handleDuplicate={this.handleDuplicate}
              handleDelete={this.handleDelete}
            />
          )}

          {editable && (
            <Modal
              title="Scheduel"
              visible={this.state.visible}
              onOk={this.showModal}
              onCancel={this.showModal}
              width={700}
            >
              <EditText
                fonts={fonts}
                fontSize={fontSize}
                lineText={lineText}
                letterSpacing={letterSpacing}
                handleChangeFonts={this.handleChangeFonts}
                handleChangeFontSize={this.handleChangeFontSize}
                handleChangeLetterSpacing={this.handleChangeLetterSpacing}
                handleChangeLineHeight={this.handleChangeLineHeight}
                handleChangeTextAlign={this.handleChangeTextAlign}
                handleChangeTextTranform={this.handleChangeTextTranform}
              />
            </Modal>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Scheduel1);
