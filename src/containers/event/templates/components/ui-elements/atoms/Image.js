import React from 'react';

import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux'

import {
    Button,
    Modal, InputNumber,
    Tabs, Slider,
    Col, Row
} from 'antd';

import PaddingAndMargin from '../shares/PaddingAndMargin';

const CLOUDINARY_UPLOAD_PRESET = 'arabdxzm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwt4njhmt/upload';
const { TabPane } = Tabs;

class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: this.props.url || 'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg',
            visible: false,

            width: this.props.width || 100,
            height: this.props.height || 60,
            href: '',
            margin: [1, 1, 1, 1],
            padding: [0, 0, 2, 1],
            borderRadius: 0,


        };
    }

    onImageDrop = (files) => {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }

    showModal = () => {
        // const { editable } = this.props;
        // if (editable) {
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
        const { uploadedFileCloudinaryUrl, width, height, margin, padding, borderRadius } = this.state;

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
        }

        return (
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
                    width="700px"
                    onCancel={this.handleCancel}
                >

                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Upload" key="1">

                            <div className="mt-2 " >
                                <img style={{ width: '450px' }} alt="img" src={uploadedFileCloudinaryUrl} />
                            </div>
                            <p>{uploadedFileCloudinaryUrl}</p>

                            <form className="mt-1">
                                <div style={{ width: '300px', height: 50 }}>
                                    <Dropzone
                                        onDrop={this.onImageDrop}
                                        accept="image/*"
                                        multiple={false}>
                                        {({ getRootProps, getInputProps }) => {
                                            return (
                                                <div
                                                    {...getRootProps()}
                                                >
                                                    <input {...getInputProps()} />
                                                    {
                                                        <Button   >Upload</Button>
                                                    }
                                                </div>
                                            )
                                        }}
                                    </Dropzone>
                                </div>
                                <div  >
                                </div>
                            </form>

                        </TabPane>

                        <TabPane tab="Design" key="2">

                            <div className="d-flex mt-2 pl-5">
                                <div className=" mr-5 d-flex" >
                                    <h6 className=" mr-5">Width (%)</h6>
                                    <InputNumber
                                        value={width}
                                        className="ml-3"
                                        name="width"
                                        min={0} max={1500}
                                        onChange={this.onWidthChange}  ></InputNumber >
                                </div>

                                <div className=" ml-5 d-flex" >
                                    <h6 className=" mr-5">Height (vh)</h6>
                                    <InputNumber
                                        value={height}
                                        className="ml-3"
                                        name="height"
                                        min={0} max={1500}
                                        onChange={this.onHeightChange}  ></InputNumber >
                                </div>
                            </div>

                            <div className=" mt-5 pl-5" >
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


        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(ImageBlock)
