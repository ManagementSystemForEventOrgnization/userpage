import React from 'react';
import { connect } from 'react-redux'
import { Button, Modal, Radio, DatePicker } from 'antd';

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

  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
  }

  //not called
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  // showModalDatepicker = () => {
  //   this.setState({
  //     isDesign: true,
  //   });
  // };

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
    const { editable } = this.props


    return (

      <div className="edittext child-block">
        <div className="mt-2" onClick={() => this.onChangeValue(true, 'isDesign')}>
          <DatePicker

            format={styleFormat} onChange={onChange} defaultValue={moment('2020/04/08')} ></DatePicker>
        </div>
        {editable &&
          <Modal
            title="Datepicker design"
            visible={this.state.isDesign}
            onCancel={this.handleCancelDesign}
            width={500}
            footer={[
              <Button key="ok" onClick={this.handleCancelDesign} type="primary">
                OK
          </Button>,
            ]}
          >

            {/* list datepicker in modal */}
            <div>
              <Radio.Group value={styleFormat} onChange={this.handleShapeChange}>
                {dateFormatList.map((dateformat, index) =>
                  <Radio value={dateformat} key={index} >
                    <DatePicker key={dateformat} onChange={onChange} format={dateformat} placeholder={dateFormat} ></DatePicker>
                  </Radio>
                )}
              </Radio.Group>

            </div>
          </Modal>

        }
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
