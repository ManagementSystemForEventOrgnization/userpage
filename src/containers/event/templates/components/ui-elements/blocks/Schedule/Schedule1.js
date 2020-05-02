import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Row, Col, Modal } from 'antd';
import { PlusCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';

import EditText from '../../shares/EditText';
import IconsHandle from '../../shares/IconsHandle';
import TextsBlock from '../../atoms/Text';
import PaddingAndMargin from '../../shares/PaddingAndMargin';
import ChangeColorModal from '../../shares/ChangeColorModal';

import { eventActions } from '../../../../../../../action/event.action';
import { ScheduleState } from '../../stateInit/ScheduleState';

class Schedule1 extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;

    this.state = style
      ? { ...style }
      : {
          ...ScheduleState(this.props, 1),
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

  onClickAddSchedule = (id) => {
    const { scheduleText } = this.state;
    const item = scheduleText.find((ele) => ele.id === id);

    scheduleText.push({
      id: uuid(),
      time: item.time,
      title: item.title,
      description: item.description,
    });
    this.setState({
      scheduleText,
    });
  };

  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    this.handleStoreBlock();
  }

  removeOption = (schedule) => {
    const scheduleText = this.state.scheduleText.filter(
      (e) => e.id !== schedule.id
    );
    this.setState({
      scheduleText,
    });
  };

  handleUpdateSchedule = (idItem, content, newParam) => {
    const { scheduleText } = this.state;
    let item = scheduleText.find((ele) => ele.id === idItem);
    const index = scheduleText.indexOf(item);
    item[`${newParam}`] = content;

    if (index === -1) return;
    else {
      this.setState({
        scheduleText: [
          ...scheduleText.slice(0, index),
          item,
          ...scheduleText.slice(index + 1, scheduleText.length),
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
  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    this.handleStoreBlock();
  }

  render() {
    // need to refactor
    const {
      scheduleText,
      margin,
      padding,
      background,
      fontSize,
      fonts,
      lineText,
      letterSpacing,
      textAlign,
      transform,
      color,
      fontWeight,
      scheduleName,
    } = this.state;
    const { key, editable, leftModal } = this.props;
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
      textTransform: transform,
      fontWeight: fontWeight,
      width: '100 %',
    };

    return (
      <div className="child-block " key={key}>
        <TextsBlock content={scheduleName} child={true} />
        <div className="d-flex">
          <div style={divStyle}>
            {scheduleText.map((schedule, index) => (
              <div className="child-block" key={index}>
                {editable && (
                  <div>
                    <PlusCircleTwoTone
                      className="ml-1 "
                      onClick={() => this.onClickAddSchedule(schedule.id)}
                    />
                    <DeleteTwoTone
                      className="ml-3 "
                      onClick={() => this.removeOption(schedule)}
                    />
                  </div>
                )}

                <Row key={index} className="mt-4">
                  <Col span={18} push={6}>
                    <TextsBlock
                      idItem={schedule.id}
                      editable={editable}
                      content={schedule.title}
                      child={true}
                      handleOnChangeTextBlock={(value) =>
                        this.handleUpdateSchedule(schedule.id, value, 'title')
                      }
                    ></TextsBlock>

                    <div className="mt-3">
                      <TextsBlock
                        child={true}
                        idItem={schedule.id}
                        editable={editable}
                        content={schedule.description}
                        handleOnChangeTextBlock={(value) =>
                          this.handleUpdateSchedule(
                            schedule.id,
                            value,
                            'description'
                          )
                        }
                      ></TextsBlock>
                    </div>
                  </Col>
                  <Col span={6} pull={18}>
                    <TextsBlock
                      child={true}
                      content={schedule.time}
                      idItem={schedule.id}
                      editable={editable}
                      handleOnChangeTextBlock={(value) =>
                        this.handleUpdateSchedule(schedule.id, value, 'time')
                      }
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
              title="schedule"
              visible={this.state.visible}
              onOk={this.showModal}
              onCancel={this.showModal}
              width={700}
              className={
                leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
              }
              style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
            >
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
                handleChangeTextTransform={(value) =>
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

export default connect(mapStateToProps, mapDispatchToProps)(Schedule1);
