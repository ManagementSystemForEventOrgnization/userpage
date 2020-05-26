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

const title = 'Wellcome!!! Edit tittle here.';
const description = 'Wellcome!!! Edit description here.';

const PLAINOPTIONS = [
  {
    day: ' Fri May 22 2020 12:00:00 GMT+0700 (Indochina Time) ',
    detail: [],
    id: ' Fri May 22 2020 12:00:00 GMT+0700 (Indochina Time) ',
    address: {
      location: 'dsfasdfhjk',
      map: {
        lat: '23424',
        lng: '2342434',
      },
    },
  },
  {
    day: ' Fri May 30 2020 12:00:00 GMT+0700 (Indochina Time) ',
    detail: [],
    id: ' Fri May 30 2020 12:00:00 GMT+0700 (Indochina Time) ',
    address: {
      location: 'dsfasdfhjk',
      map: {
        lat: '23424',
        lng: '2342434',
      },
    },
  },

  {
    day: ' Fri May 3 2020 12:00:00 GMT+0700 (Indochina Time) ',
    detail: [],
    id: ' Fri May 3 2020 12:00:00 GMT+0700 (Indochina Time) ',
    address: {
      location: 'dsfasdfhjk',
      map: {
        lat: '23424',
        lng: '2342434',
      },
    },
  },

  {
    day: ' Fri May 5 2020 12:00:00 GMT+0700 (Indochina Time) ',
    detail: [],
    id: ' Fri May 5 2020 12:00:00 GMT+0700 (Indochina Time) ',
    address: {
      location: 'dsfasdfhjk',
      map: {
        lat: '23424',
        lng: '2342434',
      },
    },
  },
];

class GeneralBanner extends Component {
  constructor(props) {
    super(props);
    const { style, session } = this.props;

    this.state =
      style && style !== {}
        ? { ...style }
        : {
            url: '/bg-3.jpg',
            visible: false,
            margin: [1, 1, 1, 1],
            padding: [10, 5, 5, 10],

            fontWeight: 'bolder',
            fontSize: 50,
            textAlign: 'center',

            opacity: 0.3,
            bgColor: 'black',
            plainOptions: session ? session : PLAINOPTIONS,
          };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

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
    // this.handleStoreBlock();
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
      console.log('handle apply event');
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
    const { plainOptions } = this.state;
    const applySession = [];
    for (let i = 0; i < plainOptions.length; i++) {
      if (checkList.indexOf(plainOptions[i].id) !== -1) {
        applySession.push(plainOptions[i]);
      }
    }
    this.setState({
      applySession,
    });
  };

  handleApplyFinish = () => {
    //get api apply event
    const { applySession } = this.state;
    console.log(applySession);
    // call api apply event
    this.handleCloseApplyEventModal();
  };

  render() {
    const {
      url,
      bgColor,
      visible,
      fontSize,
      fontWeight,
      textAlign,
      opacity,
      margin,
      padding,
      plainOptions,
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
                content={title}
                child={true}
                editable={editable}
                newStyle={{
                  fontWeight: fontWeight,
                  fontSize: fontSize,
                  textAlign: textAlign,
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Text
                content={description}
                editable={editable}
                child={true}
                newStyle={{
                  fontWeight: 'normal',
                  fontSize: 25,
                  textAlign: 'center',
                }}
              />
            </div>
          </div>
          {type === 3 && (
            <div className="row">
              <div
                className="col-sm-12"
                style={{
                  textAlign: 'center',
                }}
              >
                <ButtonBlock
                  editable={editable}
                  child={true}
                  handleApplyEvent={true && this.handleRequestApplyEvent}
                />
              </div>
            </div>
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

        {
          <Modal
            title="Apply Event"
            visible={this.state.applyEventModal}
            onOk={this.handleApplyFinish}
            onCancel={this.handleCloseApplyEventModal}
          >
            <ApplyEventModal
              handleCheckList={this.handleApply}
              plainOptions={plainOptions}
            />
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),

  duplicateBlock: (id) => dispatch(eventActions.duplicateBlock(id)),
  deleteBlock: (id) => dispatch(eventActions.deleteBlock(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralBanner);
