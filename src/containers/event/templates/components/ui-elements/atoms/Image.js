import React from 'react';

import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux'
import { Button, Modal, InputNumber } from 'antd';

const CLOUDINARY_UPLOAD_PRESET = 'arabdxzm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwt4njhmt/upload';

class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: this.props.url || 'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg',
            visible: false,

            width: 100,
            height: 60,
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
        const { editable } = this.props;
        if (editable) {
            this.setState({
                visible: true,
            });
        }

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

    onChangeMarginBottom = value => {
        let { margin } = this.state;
        margin[3] = value;
        this.setState({ margin })
    }

    onChangeMarginTop = value => {
        let { margin } = this.state;
        margin[0] = value;
        this.setState({ margin })
    }

    onChangeMarginRight = value => {
        let { margin } = this.state;
        margin[2] = value;
        this.setState({ margin })
    }

    onChangeMarginLeft = value => {
        let { margin } = this.state;
        margin[1] = value;
        this.setState({ margin })
    }

    onChangePaddingT = value => {
        let { padding } = this.state;
        padding[0] = value;
        this.setState({ padding })
    }

    onChangePaddingL = value => {
        let { padding } = this.state;
        padding[1] = value;
        this.setState({ padding })
    }

    onChangePaddingB = value => {
        let { padding } = this.state;
        padding[3] = value;
        this.setState({ padding })
    }

    onChangePaddingR = value => {
        let { padding } = this.state;
        padding[2] = value;
        this.setState({ padding })
    }

    onChangeBorderRadius = value => {
        this.setState({
            borderRadius: value
        })
    }

    render() {
        const { uploadedFileCloudinaryUrl, href, width, height, margin, padding, borderRadius } = this.state;

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
                    <div className="d-flex mt-2 pl-5">
                        <div className=" mr-5 d-flex" >
                            <h6 className=" mr-5">Width (%)</h6>
                            <InputNumber
                                value={width}
                                className="ml-5"
                                name="width"
                                min={0} max={1500}
                                onChange={this.onWidthChange}  ></InputNumber >
                        </div>

                        <div className=" ml-5 d-flex" >
                            <h6 className=" mr-3">Height (vh)</h6>
                            <InputNumber
                                value={height}
                                name="height"
                                min={0} max={1500}
                                onChange={this.onHeightChange}  ></InputNumber >
                        </div>
                    </div>

                    <div className=" mt-2 d-flex pl-5" >
                        <h6 className=" mr-5">Margin (T-L-R-B)</h6>
                        <InputNumber
                            value={margin[0]}
                            className="mr-1"
                            name="marginT"
                            min={0} max={1500}
                            onChange={this.onChangeMarginTop}  ></InputNumber >

                        <InputNumber
                            value={margin[1]}
                            className="mr-1"
                            name="marginL"
                            min={0} max={1500}
                            onChange={this.onChangeMarginLeft}  ></InputNumber >

                        <InputNumber
                            value={margin[2]}
                            className="mr-1"
                            name="marginR"
                            min={0} max={1500}
                            onChange={this.onChangeMarginRight}  ></InputNumber >
                        <InputNumber
                            value={margin[3]}
                            name="marginB"
                            min={0} max={1500}
                            onChange={this.onChangeMarginBottom}  ></InputNumber >
                    </div>


                    <div className=" mt-2 d-flex pl-5" >
                        <h6 className=" mr-5">Padding (T-L-R-B)</h6>
                        <InputNumber
                            value={padding[0]}
                            className="mr-1"
                            name="paddingT"
                            min={0} max={1500}
                            onChange={this.onChangePaddingT}  ></InputNumber >

                        <InputNumber
                            value={padding[1]}
                            className="mr-1"
                            name="paddingL"
                            min={0} max={1500}
                            onChange={this.onChangePaddingL}  ></InputNumber >

                        <InputNumber
                            value={padding[2]}
                            className="mr-1"
                            name="paddingR"
                            min={0} max={1500}
                            onChange={this.onChangePaddingR}  ></InputNumber >
                        <InputNumber
                            value={padding[3]}
                            className="mr-1"
                            name="paddingB"
                            min={0} max={1500}
                            onChange={this.onChangePaddingB}  ></InputNumber >
                    </div>


                    <div className=" mt-2 pl-5 d-flex" >
                        <h6 className=" mr-5">Rounded image (%)</h6>
                        <InputNumber
                            value={borderRadius}
                            name="width"
                            min={0} max={1500}
                            onChange={this.onChangeBorderRadius}  ></InputNumber >
                    </div>


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
