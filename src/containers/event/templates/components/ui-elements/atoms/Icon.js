import React from 'react';
import { connect } from 'react-redux'
import { Modal, Radio } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';


const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const iconName = ['icon-facebook',
  'icon-twitter',
  'icon-tuichu',

]

class IconBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isDesign: false,
      isButton: false,
      iconNameList: iconName,
    }
  }

  componentDidMount = () => {
    this.setState({
      iconNameList: iconName,
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
    const { iconNameList, styleFormat } = this.state;

    return (
      <div className="edittext">
        <div className="mt-2" onClick={this.showModalDatepicker}>
          Icons
          <IconFont type={styleFormat} />
        </div>

        <Modal
          title="Icons design"
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
              {iconNameList.map(dateformat =>
                <Radio value={dateformat} key={dateformat} >
                  <IconFont type={dateformat} />
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


export default connect(mapStateToProps, mapDispatchToProps)(IconBlock)
