import React, { Component } from 'react'
import {
    Row, Col, Select,
    Button, Modal
} from 'antd'


import Text from '../../atoms/Text'
import IconsHandle from '../../shares/IconsHandle';
import PaddingAndMargin from '../../shares/PaddingAndMargin';
import UploadImage from '../../shares/UploadImage';
import ChangeColorModal from '../../shares/ChangeColorModal';


const { Option } = Select;

class EventDescription1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            margin: [1, 1, 1, 1],
            padding: [1, 1, 1, 1],
            backgroundType: '',
            url: '',
            bgColor: 'none'
        }
    }

    collapseModal = () => {
        const { collapse } = this.state;
        this.setState({
            collapse: !collapse
        })
    }
    handleDuplicate = () => {

    }
    handleDelete = () => {

    }

    handleChangePadding = value => {
        this.setState({
            padding: value
        })
    }
    handleChangeMargin = value => {
        this.setState({
            margin: value
        })
    }

    onChange = value => {
        this.setState({
            backgroundType: value
        })
    }
    onImageDrop = value => {
        this.setState({
            url: value
        })
    }

    handleChangeBGColor = value => {
        this.setState({
            bgColor: value
        })
    }
    render() {
        const { collapse, padding, url, bgColor,
            margin, backgroundType } = this.state;
        const style = {

            marginTop: `${margin[0]}%`,
            marginLeft: `${margin[1]}%`,
            marginRight: `${margin[2]}%`,
            marginBottom: `${margin[3]}%`,
            paddingTop: `${padding[0]}%`,
            paddingLeft: `${padding[1]}%`,
            paddingRight: `${padding[2]}%`,
            paddingBottom: `${padding[3]}%`,

            maxWidth: '100%',
            maxHeight: '100%'
        }

        const titleStyle = {
            fontWeight: 'bolder',
            fontSize: '40',
            textAlign: 'left'
        }


        return (
            <div className="d-flex">
                <div className="child-block" style={style}>
                    <Row>
                        <Col span={12}>
                            <Text content="Title 1"
                                style={titleStyle}
                            />
                            <Text />
                        </Col>
                        <Col span={12} >
                            <Text content="Title 2" leftModal={true}
                                style={titleStyle}
                            />
                            <Text leftModal={true} />
                        </Col>
                    </Row>
                </div>
                <IconsHandle
                    collapseModal={this.collapseModal}
                    handleDuplicate={this.handleDuplicate}
                    handleDelete={this.handleDelete}
                />

                <Modal
                    title="Edit Block"
                    visible={collapse}
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
                    <PaddingAndMargin
                        padding={padding} margin={margin}
                        handleChangePadding={this.handleChangePadding}
                        handleChangeMargin={this.handleChangeMargin}

                    />
                    <div className="d-flex mt-5">
                        <h6 className="mr-5 "> Choose type of background</h6>
                        <Select
                            style={{ width: 180 }}
                            onChange={this.onChange}
                        >
                            <Option value="image">Background Image</Option>
                            <Option value="color">Background Color</Option>
                        </Select>

                    </div>
                    <div className="p-5 ">
                        {
                            backgroundType ?
                                backgroundType === 'image' ?
                                    <UploadImage
                                        url={url}
                                        handleImageDrop={this.onImageDrop}
                                    /> :
                                    <ChangeColorModal
                                        title="Change Background Color"
                                        color={bgColor}
                                        handleChangeColor={this.handleChangeBGColor}
                                    /> :
                                null
                        }
                    </div>





                </Modal>
            </div>


        )
    }
}

export default EventDescription1
