import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Radio, Tooltip, TimePicker } from 'antd';

import {
  EditOutlined
} from '@ant-design/icons';



const timeFormat = ['HH:mm:ss', 'h:mm:ss A', 'h:mm a', 'HH:mm'];

class TimepickersBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isDesign: false,
      isButton: false,
      timeFormatList: timeFormat,
    }
  }


  componentDidMount = () => {
    this.setState({
      timeFormatList: timeFormat
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showModalTimepicker = () => {
    this.setState({
      isDesign: true,
    });
  };
  OnClickButton = () => {
    this.setState({
      isButton: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancelDesign = e => {
    console.log(e);
    this.setState({
      isDesign: false,
    });
  };

  handleShapeChange = e => {
    this.setState({
      styleFormat: e.target.value,

    });
    console.log(this.state.styleFormat);
  };



  render() {
    const { timeFormatList, styleFormat } = this.state;


    return (

      <div className="edittext">
        <div className="d-flex flex-row mt-4">
          <Tooltip placement="topLeft" title="Design">
            <Button className="ml-2" shape="circle" onClick={this.showModalTimepicker}
            >
              <span><EditOutlined className="social-network-icon " /></span></Button>
          </Tooltip>
        </div>
        <div className="mt-2">
          <TimePicker format={styleFormat} ></TimePicker>
        </div>

        <Modal
          title="TimePicker design"
          visible={this.state.isDesign}
          onOk={this.handleOk}
          onCancel={this.handleCancelDesign}
          width={500}
          footer={[
          ]}
        >

          {/* list timepicker in modal */}
          <div>
            <Radio.Group value={styleFormat} onChange={this.handleShapeChange}>
              {timeFormatList.map(timeformat =>
                <Radio value={timeformat}>
                  <TimePicker key={timeformat} format={timeformat} placeholder={timeformat} ></TimePicker>
                </Radio>
              )}
            </Radio.Group>

          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(TimepickersBlock)
