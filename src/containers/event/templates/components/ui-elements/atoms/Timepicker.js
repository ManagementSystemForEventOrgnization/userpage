import React from 'react';
import { connect } from 'react-redux'
import { Modal, Radio, TimePicker, Button } from 'antd';


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

      <div className="edittext child-block">
        <div className="mt-2 " onClick={this.showModalTimepicker}>
          <TimePicker format={styleFormat} ></TimePicker>
        </div>

        <Modal
          title="TimePicker design"
          visible={this.state.isDesign}
          onCancel={this.handleCancelDesign}
          width={500}
          footer={[
            <Button key="ok" onClick={this.handleCancelDesign} type="primary">
              OK
          </Button>,
          ]}
        >

          {/* list timepicker in modal */}
          <div>
            <Radio.Group value={styleFormat} onChange={this.handleShapeChange}>
              {timeFormatList.map((timeformat, index) =>
                <Radio value={timeformat} key={index}>
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
