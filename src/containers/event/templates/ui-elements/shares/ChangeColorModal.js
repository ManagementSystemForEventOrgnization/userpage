import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { SketchPicker } from 'react-color';

import {
    BgColorsOutlined
} from '@ant-design/icons';

class ChangeColorModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowModal: false
        }
    }

    handleShowModal = () => {
        const { isShowModal } = this.state;
        this.setState({
            isShowModal: !isShowModal
        })
    }

    onChangeColor = value => {
        const { handleChangeColor } = this.props;
        handleChangeColor(value.hex)
    }


    render() {
        const { title, color } = this.props;
        const { isShowModal } = this.state;
        return (
            <div className="">
                <div className=" d-flex mr-5">
                    <h6>{title}</h6>
                    <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.handleShowModal} />

                </div>
                <Modal
                    title={title}
                    visible={isShowModal}
                    onCancel={this.handleShowModal}
                    width={300}
                    style={{ marginLeft: 820 }}
                    footer={[
                        <Button key="ok" onClick={this.handleShowModal} type="primary">
                            OK
                        </Button>,
                    ]}
                >
                    <SketchPicker color={color}
                        onChangeComplete={this.onChangeColor} />

                </Modal>

            </div>
        )
    }
}

export default ChangeColorModal
