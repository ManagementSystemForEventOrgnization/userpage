import React from 'react';
import { connect } from 'react-redux'

import {
    Modal, InputNumber,
    Tabs, Slider,
    Col, Row
} from 'antd';


import PaddingAndMargin from '../shares/PaddingAndMargin';
import UploadImage from '../shares/UploadImage';
import { ImageState } from '../stateInit/ImageState'

const { TabPane } = Tabs;

class ImageBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...ImageState(this.props)
        };
    }


    // common function
    onChangeValue(newValue, valueParam) {
        this.setState({
            [valueParam]: newValue,
        });
    }

    onImageDrop = url => {
        const { id, handleOnChangeUrlTextBlock } = this.props;
        this.setState({
            uploadedFileCloudinaryUrl: url
        })
        if (id) {
            handleOnChangeUrlTextBlock(id, this.state.uploadedFileCloudinaryUrl);
        }
    }

    render() {
        const { uploadedFileCloudinaryUrl,
            width, height, margin, padding,
            borderRadius } = this.state;
        const { leftModal, editable } = this.props;

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
                    onClick={() => this.onChangeValue(true, 'visible')} />

                {editable && <Modal
                    title="Edit Image"
                    visible={this.state.visible}
                    onOk={() => this.onChangeValue(false, 'visible')}
                    onCancel={() => this.onChangeValue(false, 'visible')}
                    width="500px"
                    className={leftModal ? " mt-3 float-left ml-5" : "float-right mr-3 mt-3"}
                    style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
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
                                        onChange={(value) => this.onChangeValue(value, 'width')}  ></InputNumber >
                                </div>

                                <div className=" ml-5 d-flex" >
                                    <h6 className=" mr-2">Height (vh)</h6>
                                    <InputNumber
                                        value={height}
                                        className="ml-3"
                                        name="height"
                                        min={0} max={1500}
                                        onChange={(value) => this.onChangeValue(value, 'height')}  ></InputNumber >
                                </div>
                            </div>

                            <div className=" mt-5" >
                                <h6 className=" mr-5">Rounded image (%)</h6>
                                <Row>
                                    <Col span={12} className="mr-4">
                                        <Slider
                                            min={0}
                                            max={100}
                                            onChange={(value) => this.onChangeValue(value, 'borderRadius')}
                                            value={typeof borderRadius === 'number' ? borderRadius : 0}
                                        />
                                    </Col>
                                    <Col>
                                        <InputNumber
                                            value={borderRadius}
                                            name="width"
                                            min={0} max={100}
                                            onChange={(value) => this.onChangeValue(value, 'borderRadius')}  ></InputNumber >

                                    </Col>
                                </Row>
                            </div>

                            <PaddingAndMargin
                                margin={margin}
                                padding={padding}
                                handleChangePadding={(value) => this.onChangeValue(value, 'padding')}
                                handleChangeMargin={(value) => this.onChangeValue(value, 'margin')}
                            />


                        </TabPane>
                    </Tabs>
                </Modal>
                }
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
