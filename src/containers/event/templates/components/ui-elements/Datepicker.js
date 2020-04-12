import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Radio, Tooltip, DatePicker } from 'antd';
import {
  EditOutlined
} from '@ant-design/icons';
import moment from 'moment';


function onChange(date, dateString) {
  console.log(date, dateString);
}

const dateFormat = ['YYYY/MM/DD', 'DD/MM/YYYY', 'MM/DD/YYYY'];

class DatepickersBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isDesign: false,
      isButton: false,
      dateFormatList: dateFormat,
    }
  }


  componentDidMount = () => {
    this.setState({
      dateFormatList: dateFormat
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  showModalDatepicker = () => {
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

    const { dateFormatList, styleFormat } = this.state;


    return (

      <div className="edittext">
        <div className="d-flex flex-row mt-4">
          <Tooltip placement="topLeft" title="Design">
            <Button className="ml-2" style={{ width: 10 }} shape="circle" onClick={this.showModalDatepicker}
            >
              <span><EditOutlined className="social-network-icon " /></span></Button>
          </Tooltip>
        </div>
        <div className="mt-2">
          <DatePicker

            format={styleFormat} onChange={onChange} defaultValue={moment('2020/04/08')} ></DatePicker>
        </div>

        <Modal
          title="Datepicker design"
          visible={this.state.isDesign}
          onOk={this.handleOk}
          onCancel={this.handleCancelDesign}
          width={500}
          footer={[
          ]}
        >

          {/* list datepicker in modal */}
          <div>
            <Radio.Group value={styleFormat} onChange={this.handleShapeChange}>
              {dateFormatList.map(dateformat =>
                <Radio value={dateformat}>
                  <DatePicker key={dateformat} onChange={onChange} format={dateformat} placeholder={dateFormat} ></DatePicker>
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


export default connect(mapStateToProps, mapDispatchToProps)(DatepickersBlock)
