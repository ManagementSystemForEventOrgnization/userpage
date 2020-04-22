import React from 'react';
import { connect } from 'react-redux'

import {
    Modal, InputNumber,
    Tabs, Slider,
    Col, Row
} from 'antd';


import PaddingAndMargin from '../shares/PaddingAndMargin';
import UploadImage from '../shares/UploadImage';


const { TabPane } = Tabs;

class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedFileCloudinaryUrl: this.props.url || 'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg',
            visible: false,
            width: 100,
            height: 60,
            href: '',
            margin: [1, 1, 1, 1],
            padding: [1, 1, 2, 1],
            borderRadius: 0,


        };
    }

    onImageDrop = url => {
        this.setState({
            uploadedFileCloudinaryUrl: url
        })
    }

    showModal = () => {

        this.setState({
            visible: true,
        });


    };

    handleOk = e => {
        this.setState({
            visible: false,
        });


        // save style of component 
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    onHeightChange = value => {
        this.setState({
            height: value
        })
    }

    onWidthChange = value => {
        this.setState({
            width: value
        })
    }

    onChangeMargin = value => {
        this.setState({
            margin: value
        })
    }
    onChangePadding = value => {
        this.setState({
            padding: value
        })
    }

    onChangeBorderRadius = value => {
        this.setState({
            borderRadius: value
        })
    }

    render() {
        const { uploadedFileCloudinaryUrl,
            width, height, margin, padding,
            borderRadius } = this.state;
        const { leftModal } = this.props;

        const imageStyle = {
            width: `${width}%`,
            height: `${height}vh`,
            marginTop: `${margin[0]}%`,
            marginLeft: `${margin[1]}%`,
            marginRight: `${margin[2]}%`,
            marginBottom: `${margin[3]}%`,
            paddingTop: `${padding[0]}%`,
            paddingLeft: `${padding[1]}%`,
            paddingRight: `${padding[2]}%`,
            paddingBottom: `${padding[3]}%`,
            borderRadius: `${borderRadius}%`,

            maxWidth: '100%',
            maxHeight: '100%'
        }

        return (
            // <div >
            //     <div className="d-flex handle-menu float-right">
            //         <EditTwoTone className="mr-3" />
            //         <DeleteTwoTone className="mr-3" />
            //         <CopyTwoTone />
            //     </div>

            <div className="image-block child-block">

                <img
                    style={imageStyle}
                    alt="img"
                    src={uploadedFileCloudinaryUrl}
                    onClick={this.showModal} />

                <Modal
                    title="Edit Image"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width="500px"
                    className={leftModal ? " mt-3" : "float-right mr-3 mt-3"}
                    style={{ top: 40 }}
                >
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Upload" key="1">
                            <UploadImage
                                url={uploadedFileCloudinaryUrl}
                                handleImageDrop={this.onImageDrop}
                            />
                        </TabPane>

                        <TabPane tab="Design" key="2">
                            <div className="d-flex mt-2 ">
                                <div className=" mr-5 d-flex" >
                                    <h6 className=" mr-2">Width (%)</h6>
                                    <InputNumber
                                        value={width}
                                        className="ml-3"
                                        name="width"
                                        min={0} max={1500}
                                        onChange={this.onWidthChange}  ></InputNumber >
                                </div>

                                <div className=" ml-5 d-flex" >
                                    <h6 className=" mr-2">Height (vh)</h6>
                                    <InputNumber
                                        value={height}
                                        className="ml-3"
                                        name="height"
                                        min={0} max={1500}
                                        onChange={this.onHeightChange}  ></InputNumber >
                                </div>
                            </div>

                            <div className=" mt-5" >
                                <h6 className=" mr-5">Rounded image (%)</h6>
                                <Row>
                                    <Col span={12} className="mr-4">
                                        <Slider
                                            min={0}
                                            max={100}
                                            onChange={this.onChangeBorderRadius}
                                            value={typeof borderRadius === 'number' ? borderRadius : 0}
                                        />
                                    </Col>
                                    <Col>
                                        <InputNumber
                                            value={borderRadius}
                                            name="width"
                                            min={0} max={100}
                                            onChange={this.onChangeBorderRadius}  ></InputNumber >

                                    </Col>
                                </Row>
                            </div>

                            <PaddingAndMargin
                                margin={margin}
                                padding={padding}
                                handleChangePadding={this.onChangePadding}
                                handleChangeMargin={this.onChangeMargin}
                            />


                        </TabPane>
                    </Tabs>
                </Modal>

            </div>


            // </div>

        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(ImageBlock)
