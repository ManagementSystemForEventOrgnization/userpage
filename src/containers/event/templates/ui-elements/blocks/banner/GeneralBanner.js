import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

import Text from '../../atoms/Text';
import IconsHandle from '../../shares/IconsHandle';
import ChangeParentBlockStyle from '../../shares/ChangeParentBlockStyle';
import ApplyEventModal from '../../shares/ApplyEventModal';
import ImageBlock from '../../atoms/Image';

import { eventActions } from 'action/event.action';
import history from 'utils/history';
import { BannerState } from '../../stateInit/BannerState';
import { applyEventActions } from 'action/applyEvent';

class GeneralBanner extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state =
      style && Object.keys(style).length !== 0
        ? { ...style, visible: false }
        : {
            ...BannerState(this.props),
            applySession: [],
          };
  }

  openModal = () => this.setState({ visible: true });

  closeModal = () => {
    this.setState({ visible: false });
    this.handleStoreBlock();
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
  };

  componentDidMount = () => {
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

  collapseApplyModal = () => {
    const isLogined = localStorage.getItem('isLogined');
    const { applyEventModal } = this.state;
    if (!isLogined) {
      history.push('/login');
    } else {
      this.setState({
        applyEventModal: !applyEventModal,
      });
    }
  };

  handleChangeContent = (type, value) => {
    let { content } = this.state;
    content[type] = value;
    this.setState(content);
    setTimeout(this.handleStoreBlock(), 3000);
  };

  getCustomStyle = () => {
    const { margin, padding } = this.state;
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
    return style;
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

    const { type, editable, status } = this.props;
    const style = this.getCustomStyle();

    return (
      <div className=" child-block d-flex" style={style}>
        <div style={style} className="flex-fill">
          <ImageBlock
            editable={editable}
            url={url}
            child={true}
            objectFit="cover"
          />
          <Text
            content={content.title.value}
            child={true}
            editable={editable}
            newStyle={content.title.style}
            changeContent={(value) => this.handleChangeContent('title', value)}
          />
          <hr
            style={{ borderTop: '2px solid #8585e6', margin: '0 10% 0 10%' }}
          />

          <Text
            content={content.description.value}
            editable={editable}
            child={true}
            newStyle={content.description.style}
            changeContent={(value) =>
              this.handleChangeContent('description', value)
            }
          />

          {type === 3 && (
            <div className="text-center mt-2">
              <Button
                type="primary"
                size="large"
                onClick={
                  !editable && status === 'PUBLIC'
                    ? this.collapseApplyModal
                    : () => {}
                }
              >
                Apply Event Now
              </Button>
            </div>
          )}
        </div>

        {editable && (
          <IconsHandle
            collapseModal={this.openModal}
            handleDuplicate={this.handleDuplicate}
            handleDelete={this.handleDelete}
          />
        )}

        {editable && (
          <Modal
            title="Edit Block"
            visible={visible}
            onCancel={this.closeModal}
            width={500}
            className=" mt-3 float-left ml-5"
            style={{ top: 40, left: 200 }}
            footer={[
              <Button key="ok" onClick={this.closeModal} type="primary">
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
          onCancel={this.collapseApplyModal}
          footer={[
            <Button key="ok" onClick={this.collapseApplyModal} type="dashed">
              Close
            </Button>,
          ]}
        >
          <ApplyEventModal />
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
  eventId: state.event.id,
  session: state.event.session,
  status: state.event.status,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),

  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),

  applyEvent: (eventId, sessionIds) =>
    dispatch(applyEventActions.applyEvent(eventId, sessionIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralBanner);
