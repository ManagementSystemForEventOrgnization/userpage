import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

import Text from '../../atoms/Text';
import IconsHandle from '../../shares/IconsHandle';
import ChangeParentBlockStyle from '../../shares/ChangeParentBlockStyle';
import ApplyEventModal from '../../shares/ApplyEventModal';
import ButtonBlock from '../../atoms/Button';

import { eventActions } from 'action/event.action';
import history from 'utils/history';
import { BannerState } from '../../stateInit/BannerState';

class GeneralBanner extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state =
      style && Object.keys(style).length !== 0
        ? { ...style, visible: false }
        : {
            ...BannerState(this.props),
          };
  }

  collapseModal = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
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

  onChangeStyle = (type, value) => {
    this.setState({
      [type]: value,
    });
    setTimeout(this.handleStoreBlock(), 3000);
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

  handleRequestApplyEvent = () => {
    const isLogined = localStorage.getItem('isLogined');
    if (!isLogined) {
      history.push('/login');
    } else {
      this.setState({
        applyEventModal: true,
      });
    }
  };

  handleCloseApplyEventModal = () => {
    this.setState({
      applyEventModal: false,
    });
  };

  handleApply = (checkList) => {
    const { session } = this.props;

    const applySession = [];
    for (let i = 0; i < session.length; i++) {
      if (checkList.indexOf(session[i].id) !== -1) {
        session.push(session[i]);
      }
    }
    this.setState({
      applySession,
    });
  };

  handleApplyFinish = () => {
    //get api apply event
    // const { applySession } = this.state;
    // console.log(applySession);
    // call api apply event
    this.handleCloseApplyEventModal();
  };

  handleChangeContent = (type, value) => {
    let { content } = this.state;
    content[type] = value;
    this.setState(content);
  };

  render() {
    const {
      url,
      bgColor,
      visible,
      opacity,
      margin,
      padding,
      content,
    } = this.state;

    const { type, editable } = this.props;

    const style = {
      marginTop: `${margin[0]}%`,
      marginLeft: `${margin[1]}%`,
      marginRight: `${margin[2]}%`,
      marginBottom: `${margin[3]}%`,
      paddingTop: `${padding[0]}%`,
      paddingLeft: `${padding[1]}%`,
      paddingRight: `${padding[2]}%`,
      paddingBottom: `${padding[3]}%`,

      position: 'relative',
      backgroundImage: url ? `url(${url})` : 'white',
      backgroundSize: 'cover',
      backgroundPosition: 'center',

      width: '100%',
    };

    const bg = {
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      opacity: opacity,
      backgroundColor: bgColor,
    };

    return (
      <div className=" child-block d-flex">
        <div style={style}>
          {url && <div style={bg}></div>}

          <div className="row">
            <div className="col-sm-12">
              <Text
                content={content.title.value}
                child={true}
                editable={editable}
                newStyle={content.title.style}
                changeContent={(value) =>
                  this.handleChangeContent('title', value)
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Text
                content={content.description.value}
                editable={editable}
                child={true}
                newStyle={content.description.style}
                changeContent={(value) =>
                  this.handleChangeContent('description', value)
                }
              />
            </div>
          </div>

          {type === 3 && (
            <ButtonBlock
              editable={editable}
              child={true}
              content={content.buttonText.value}
              handleApplyEvent={this.handleRequestApplyEvent}
              changeContent={(value) =>
                this.handleChangeContent('buttonText', value)
              }
            />
          )}
        </div>

        {editable && (
          <IconsHandle
            collapseModal={this.collapseModal}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}

        {editable && (
          <Modal
            title="Edit Block"
            visible={visible}
            onCancel={this.collapseModal}
            width={500}
            className=" mt-3 float-left ml-5"
            style={{ top: 40, left: 200 }}
            footer={[
              <Button key="ok" onClick={this.collapseModal} type="primary">
                OK
              </Button>,
            ]}
          >
            <ChangeParentBlockStyle
              padding={padding}
              margin={margin}
              opacity={opacity}
              bgColor={bgColor}
              url={url}
              handleChangePadding={(value) =>
                this.onChangeStyle('padding', value)
              }
              handleChangeMargin={(value) =>
                this.onChangeStyle('margin', value)
              }
              handleChangeTypeBG={(value) =>
                this.onChangeStyle('backgroundType', value)
              }
              handleChangeOpacity={(value) =>
                this.onChangeStyle('opacity', value === 10 ? '1' : `0.${value}`)
              }
              handleChangeImage={(value) => this.onChangeStyle('url', value)}
              handleChangeColor={(value) =>
                this.onChangeStyle('bgColor', value)
              }
            />
          </Modal>
        )}

        <Modal
          title="Apply Event"
          visible={this.state.applyEventModal}
          onOk={this.handleApplyFinish}
          onCancel={this.handleCloseApplyEventModal}
        >
          <ApplyEventModal handleCheckList={this.handleApply} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  userInfo: state.user.userInfo,
  banner: state.event.banner,
  nameEvent: state.event.nameEvent,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),

  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralBanner);
