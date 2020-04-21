import React, { Component } from 'react';
import {
    Modal, InputNumber,
    Tabs,
} from 'antd';

import Text from '../../atoms/Text';
import UploadImage from '../../shares/UploadImage';
import PaddingAndMargin from '../../shares/PaddingAndMargin';

const { TabPane } = Tabs;
const title = "Wellcome!!! Edit tittle here.";
const description = "Wellcome!!! Edit description here.";

class Banner2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModal: false,
            uploadedFileCloudinaryUrl: this.props.url || '/bg-2.jpg',
            visible: false,
            width: 100,
            height: 60,
            href: '',
            margin: [1, 1, 1, 1],
            padding: [10, 5, 5, 10],

            fontWeight: 'bolder',
            fontSize: 50,
            textAlign: 'center',




        }
    }

    onImageDrop = url => {
        this.setState({
            uploadedFileCloudinaryUrl: url
        })
    }

    render() {
        const { isOpenModal,
            uploadedFileCloudinaryUrl,
            fontSize, fontWeight, textAlign,
            width, height, margin, padding } = this.state;

        const style = {
            color: 'black',
            backgroundImage: `url(${uploadedFileCloudinaryUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // height: `${height}vh`,
            width: `${width}%`,
            marginTop: `${margin[0]}%`,
            marginLeft: `${margin[1]}%`,
            marginRight: `${margin[2]}%`,
            marginBottom: `${margin[3]}%`,
            paddingTop: `${padding[0]}%`,
            paddingLeft: `${padding[1]}%`,
            paddingRight: `${padding[2]}%`,
            paddingBottom: `${padding[3]}%`,
        }

        return (
            <div className="banner-block-2 child-block" style={style} >
                {/* <div className="bg" style={{ opacity: 0.5 }} ></div> 

                    Upload background
                    Change opacity
                    Change padding, margin
                
                */}
                <Text content={title} style={
                    {
                        fontWeight: fontWeight,
                        fontSize: fontSize,
                        textAlign: textAlign
                    }
                } />
                <Text content={description}
                    style={
                        {
                            fontWeight: 'normal',
                            fontSize: 25,
                            textAlign: 'center'
                        }
                    }
                />
                <Modal
                    title="Edit Image"
                    visible={isOpenModal}
                    onOk={this.collapseModal}
                    width="700px"
                    onCancel={this.collapseModal}
                >
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Upload" key="1">
                            <UploadImage
                                url={uploadedFileCloudinaryUrl}
                                handleImageDrop={this.onImageDrop}
                            />
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

export default Banner2
