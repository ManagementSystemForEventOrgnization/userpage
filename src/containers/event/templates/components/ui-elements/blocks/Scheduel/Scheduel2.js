import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Modal } from 'antd';
import { PlusCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';

import IconsHandle from '../../shares/IconsHandle';
import EditText from '../../shares/EditText';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import ButtonBlock from '../../atoms/Button';
import { eventActions } from '../../../../../../../action/event.action';

const src =
  'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg';
class Scheduel2 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style }
      : {
          visible: false,
          isShowForm: false,
          txtdaySchedule: ' ',
          txtUrl: '',
          txtTitle: '',
          txtDescription: '',
          txtticket: '',
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
          scheduelName: 'Schedule',

          scheduelText: [
            {
              id: 1,
              daySchedule: '27 jun, 2015',
              url: src,
              title: ' NAM ENIM EROS RHONCUS',
              description: '8 Rue de Montpensier 75001, Paris, France, 18:00 ',
              ticket: '15$',
              buttonText: 'buy ticket',
            },
            {
              id: 2,
              daySchedule: '27 jun, 2015 ',
              url: src,
              title: ' NAM ENIM EROS ',
              description: '8 Rue de Montpensier  ',
              ticket: '15$',
              buttonText: 'buy ticket',
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
      title: item.title,
      description: item.description,
      ticket: item.ticket,
      daySchedule: item.daySchedule,
      url: item.url,
      buttonText: item.buttonText,
    });
    this.setState({
      scheduelText,
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
  handleOnChangeDayTextBlock = (id, value) => {
    const { scheduelText } = this.state;
    const item = scheduelText.find((ele) => ele.id === id);
    const index = scheduelText.indexOf(item);
    item.daySchedule = value;
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
    console.log('ticket:', scheduelText);
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
  handleOnChangeUrlTextBlock = (id, value) => {
    const { scheduelText } = this.state;
    const item = scheduelText.find((ele) => ele.id === id);
    const index = scheduelText.indexOf(item);
    item.url = value;
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
    console.log(scheduelText);
  };
  handleOnChangeTicketTextBlock = (id, value) => {
    const { scheduelText } = this.state;
    const item = scheduelText.find((ele) => ele.id === id);
    const index = scheduelText.indexOf(item);
    item.ticket = value;
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
    console.log('ticket:', scheduelText);
  };
  handleOnChangeButtonTextBlock = (id, value) => {
    const { scheduelText } = this.state;
    const item = scheduelText.find((ele) => ele.id === id);
    const index = scheduelText.indexOf(item);
    item.buttonText = value;
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
    console.log('ticket:', scheduelText);
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
    const { editable } = this.props;

    const {
      scheduelText,
      margin,
      padding,
      scheduelName,
      background,
      fontSize,
      fonts,
      lineText,
      letterSpacing,
      color,
      textAlign,
      tranform,
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
      <div className="child-block" style={divStyle}>
        <Text content={scheduelName} />
        <div className="d-flex">
          <div>
            {scheduelText.map((scheduel, index) => (
              <div className="child-block" key={index}>
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
                <div className="row mt-1">
                  <div className="col-2 mt-5 ml-4">
                    <Text
                      content={scheduel.daySchedule}
                      id={scheduel.id}
                      handleOnChangeTextBlock={this.handleOnChangeDayTextBlock}
                    />
                  </div>
                  <div className=" col-2">
                    <Image
                      url={scheduel.url}
                      id={scheduel.id}
                      handleOnChangeUrlTextBlock={
                        this.handleOnChangeUrlTextBlock
                      }
                      height={25}
                    />
                  </div>

                  <div className="mt-5 col-5">
                    <Text
                      content={scheduel.title}
                      id={scheduel.id}
                      handleOnChangeTextBlock={
                        this.handleOnChangeTitleTextBlock
                      }
                    />
                    <div className="mt-3">
                      <Text
                        content={scheduel.description}
                        id={scheduel.id}
                        handleOnChangeTextBlock={
                          this.handleOnChangeDesTextBlock
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-5 col">
                    <Text
                      content={scheduel.ticket}
                      id={scheduel.id}
                      handleOnChangeTextBlock={
                        this.handleOnChangeTicketTextBlock
                      }
                    />
                  </div>
                  <div className=" mt-5 col">
                    <ButtonBlock
                      content={scheduel.buttonText}
                      id={scheduel.id}
                      handleOnChangeButtonTextBlock={
                        this.handleOnChangeButtonTextBlock
                      }
                    />
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Scheduel2);
