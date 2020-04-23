import React, { Component } from 'react';
import {
    Modal, Button,
} from 'antd';

import Text from '../../atoms/Text';
import IconsHandle from '../../shares/IconsHandle';
import ChangeParentBlockStyle from '../../shares/ChangeParentBlockStyle';
import ButtonBlock from '../../atoms/Button'


const title = "Wellcome!!! Edit tittle here.";
const description = "Wellcome!!! Edit description here.";


class GeneralBanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: '/bg-3.jpg',
            visible: false,
            margin: [1, 1, 1, 1],
            padding: [10, 5, 5, 10],

            fontWeight: 'bolder',
            fontSize: 50,
            textAlign: 'center',

            opacity: 0.3,
            bgColor: 'none',
        }
    }

    onImageDrop = url => {
        this.setState({
            url: url
        })
    }

    collapseModal = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
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
    handleChangeTypeBG = value => {
        this.setState({
            backgroundType: value
        })
    }
    handleChangeOpacity = value => {
        this.setState({
            opacity: value === 10 ? '1' : `0.${value}`
        })
    }
    handleChangeColor = value => {
        this.setState({
            bgColor: value
        })
    }
    render() {
        const { url, bgColor, visible,
            fontSize, fontWeight, textAlign,
            opacity, margin, padding } = this.state;

        const { type } = this.props;

        const style = {
            marginTop: `${margin[0]}%`,
            marginLeft: `${margin[1]}%`,
            marginRight: `${margin[2]}%`,
            marginBottom: `${margin[3]}%`,
            paddingTop: `${padding[0]}%`,
            paddingLeft: `${padding[1]}%`,
            paddingRight: `${padding[2]}%`,
            paddingBottom: `${padding[3]}%`,

            position: 'relative',
            backgroundImage: url ? `url(${url})` : 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: bgColor,
        }

        const bg = {
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            opacity: opacity,
            backgroundColor: 'black'
        }

        return (
            <div className=" child-block d-flex" >
                <div style={style} className="container">
                    {url &&
                        <div style={bg}></div>}

                    <div className="row" >
                        <div className="col-sm-12">
                            <Text content={title}
                                style={{
                                    fontWeight: fontWeight,
                                    fontSize: fontSize,
                                    textAlign: textAlign
                                }}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <Text content={description}
                                style={
                                    {
                                        fontWeight: 'normal',
                                        fontSize: 25,
                                        textAlign: 'center'
                                    }
                                }
                            />
                        </div>

                    </div>
                    {
                        type === 3 &&
                        <div className="row">
                            <div className="col-sm-12" style={{
                                textAlign: 'center'
                            }}>
                                <ButtonBlock />
                            </div>

                        </div>
                    }
                </div>




                <IconsHandle
                    collapseModal={this.collapseModal}
                    handleDuplicate={this.handleDuplicate}
                    handleDelete={this.handleDelete}
                />


                <Modal
                    title="Edit Block"
                    visible={visible}
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
                    <ChangeParentBlockStyle
                        padding={padding}
                        margin={margin}
                        opacity={opacity}
                        bgColor={bgColor}
                        url={url}

                        handleChangePadding={this.handleChangePadding}
                        handleChangeMargin={this.handleChangeMargin}
                        handleChangeTypeBG={this.handleChangeTypeBG}
                        handleChangeOpacity={this.handleChangeOpacity}
                        handleChangeImage={this.onImageDrop}
                        handleChangeColor={this.handleChangeColor}

                    />
                </Modal>

            </div >
        )
    }
}

export default GeneralBanner
