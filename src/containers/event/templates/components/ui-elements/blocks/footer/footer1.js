import React, { Component } from 'react'
import {
    Button, Modal,
} from 'antd'

import TextsBlock from '../../atoms/Text';
import ButtonsBlock from '../../atoms/Button';
import IconsHandle from '../../shares/IconsHandle';
import ChangeParentBlockStyle from '../../shares/ChangeParentBlockStyle'
export default class footer1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            margin: [1, 1, 1, 1],
            padding: [7, 1, 1, 7],
            url: '',
            bgColor: 'black',
            opacity: 0.3

        }
    }
    collapseModal = () => {
        const { collapse } = this.state;
        this.setState({
            collapse: !collapse
        })
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

    onChangeOpacity = value => {
        this.setState({
            opacity: value === 10 ? '1' : `0.${value}`
        })
    }

    render() {
        const { editable } = this.props;
        const { name, support, phone, collapse, padding, url, bgColor, opacity,
            margin } = this.state;
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

        const titleStyle = {
            fontWeight: 'bolder',
            fontSize: '40',

        }


        return (
            <div className="child-block d-flex  " style={{ height: 300 }}>

                <div className=" child-block" style={style}>
                    {url &&
                        <div style={bg}></div>}
                    <div className="row  " >
                        <div className="col">
                            <TextsBlock content="© 2018 All rights reserved."
                                textAlign={"center"}
                            />
                        </div>
                        <div className="col">
                            <TextsBlock content="Support 24/7"
                                textAlign={"center"} />
                            <ButtonsBlock content="+458 669 221" />
                        </div>
                        <div className="col">
                            <TextsBlock content="© 2018 All rights reserved."
                                textAlign={"center"} />
                        </div>
                    </div>
                </div>
                {
                    editable && <IconsHandle
                        collapseModal={this.collapseModal}
                        handleDuplicate={this.handleDuplicate}
                        handleDelete={this.handleDelete}
                    />
                }
                {editable &&
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
                        <ChangeParentBlockStyle
                            padding={padding}
                            margin={margin}
                            opacity={opacity}
                            bgColor={bgColor}
                            url={url}

                            handleChangePadding={this.handleChangePadding}
                            handleChangeMargin={this.handleChangeMargin}
                            handleChangeTypeBG={this.onChange}
                            handleChangeOpacity={this.onChangeOpacity}
                            handleChangeImage={this.onImageDrop}
                            handleChangeColor={this.handleChangeBGColor}

                        />
                    </Modal>

                }

            </div >
        )
    }
}
