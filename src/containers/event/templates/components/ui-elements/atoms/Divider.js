import React from 'react';
import { connect } from 'react-redux'
import { Modal, Radio, Divider } from 'antd';

const orientation = ['left', 'right', 'center'];

class DividersBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isDesign: false,
            isButton: false,
            orientationList: orientation,
        }
    }

    componentDidMount = () => {
        this.setState({
            orientationList: orientation
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    showModalDivider = () => {
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
        const { orientationList, styleFormat } = this.state;

        return (

            <div className="edittext">
                <div className="mt-2" onClick={this.showModalDivider}>
                    <Divider orientation={styleFormat}>Text </Divider>
                </div>

                <Modal
                    title="TimePicker design"
                    visible={this.state.isDesign}
                    onOk={this.handleOk}
                    onCancel={this.handleCancelDesign}
                    width={900}
                    footer={[
                    ]}
                >

                    {/* list timepicker in modal */}
                    <div>
                        <Radio.Group value={styleFormat} onChange={this.handleShapeChange}>
                            {orientationList.map(orienformat =>
                                <Radio value={orienformat} key={orienformat}>
                                    <Divider orientation={orienformat}>{orienformat} </Divider>
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


export default connect(mapStateToProps, mapDispatchToProps)(DividersBlock)
