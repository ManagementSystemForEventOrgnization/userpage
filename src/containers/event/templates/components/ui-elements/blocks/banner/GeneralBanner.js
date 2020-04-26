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
            bgColor: 'black',
        }
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



    onChangeStyle = (type, value) => {
        this.setState({
            [type]: value
        })
    }
    render() {
        const { url, bgColor, visible,
            fontSize, fontWeight, textAlign,
            opacity, margin, padding } = this.state;

        const { type, editable } = this.props;


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

            width: '100%'
        }

        const bg = {
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            opacity: opacity,
            backgroundColor: bgColor
        }

        return (
            <div className=" child-block d-flex" >
                <div style={style}>
                    {url &&
                        <div style={bg}></div>}

                    <div className="row" >
                        <div className="col-sm-12">
                            <Text content={title}
                                editable={editable}
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
                                editable={editable}
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
                                <ButtonBlock editable={editable} />
                            </div>

                        </div>
                    }
                </div>

                {editable &&
                    <IconsHandle
                        collapseModal={this.collapseModal}
                        handleDuplicate={this.handleDuplicate}
                        handleDelete={this.handleDelete}
                    />}

                {editable &&
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

                            handleChangePadding={value => this.onChangeStyle('padding', value)}
                            handleChangeMargin={value => this.onChangeStyle('margin', value)}
                            handleChangeTypeBG={value => this.onChangeStyle('backgroundType', value)}
                            handleChangeOpacity={value => this.onChangeStyle('opacity', value === 10 ? '1' : `0.${value}`)}
                            handleChangeImage={value => this.onChangeStyle('url', value)}
                            handleChangeColor={value => this.onChangeStyle('bgColor', value)}

                        />
                    </Modal>
                }
            </div >
        )
    }
}

export default GeneralBanner
