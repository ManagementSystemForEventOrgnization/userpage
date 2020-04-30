import React, { Component } from 'react'
import { Modal, Button, Input, } from 'antd';
import {

    FacebookOutlined,
    SkypeOutlined,
    YoutubeOutlined,
    EditTwoTone,
    CloseSquareTwoTone,
    InstagramOutlined


} from '@ant-design/icons'
import IconsHandle from '../../shares/IconsHandle';



class IconsSocial extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            isShowFace: false,
            isShowYou: false,
            isShowSkype: false,
            isShowIntergram: false,
            txtFace: "",
            txtYoutube: "",
            txtSkype: "",
            txtIntergram: "",

            IconFaceBook: [
                {
                    id: 1
                }
            ]



        }
    }
    showModal = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible,
        });
    };
    showFacebook = () => {
        const { isShowFace } = this.state;
        this.setState({
            isShowFace: !isShowFace
        });
    };
    showYoutube = () => {
        const { isShowYou } = this.state;
        this.setState({
            isShowYou: !isShowYou
        });
    };
    showSkype = () => {
        const { isShowSkype } = this.state;
        this.setState({
            isShowSkype: !isShowSkype
        });
    };
    showIntergram = () => {
        const { isShowIntergram } = this.state;
        this.setState({
            isShowIntergram: !isShowIntergram
        });
    };

    onChangeFacebook = (e) => {
        this.setState({
            txtFace: e.target.value
        })
    }
    onChangeYouTube = (e) => {
        this.setState({
            txtYoutube: e.target.value
        })
    }
    onChangeSkype = (e) => {
        this.setState({
            txtskype: e.target.value
        })
    }
    onChangeIntergram = (e) => {
        this.setState({
            txtIntergram: e.target.value
        })
    }

    // onChangeValue(newValue, valueParam) {
    //     this.setState({
    //       [valueParam]: newValue,
    //     });
    //   }

    render() {
        const style = {
            margin: '10px',
            padding: '5px',
        }
        const { editable } = this.props;

        const { isShowFace, isShowYou, isShowSkype, isShowIntergram,
            txtFace, txtYoutube, txtSkype, txtIntergram, IconFaceBook
        } = this.state;


        const mo = "FacebookOutlined"
        return (

            <div className="d-flex child-block social ">
                <div className="child-block" style={{ width: '100%' }}>
                    {IconFaceBook.map(i =>
                        < a href={txtFace}>
                            <Button style={{ background: '#3B5998' }} shape="circle"

                                icon={<FacebookOutlined className=" fa-facebook social-network-icon" />}>

                            </Button>
                        </a>
                    )}
                    <a href={txtSkype}>
                        <Button style={{ background: '#4e92df' }} shape="circle"

                            icon={<SkypeOutlined className=" fa-twitter social-network-icon" />} />
                    </a>
                    <a href={txtYoutube}>
                        <Button style={{ background: '#EA4335' }} shape="circle"

                            icon={<YoutubeOutlined className=" fa-google social-network-icon" />} />
                    </a>
                    <a href={txtIntergram}>
                        <Button shape="circle"

                            icon={<InstagramOutlined className=" fa-instagram social-network-icon" />} />

                    </a>
                </div>
                {
                    editable && <IconsHandle
                        collapseModal={this.showModal}
                        handleDuplicate={this.handleDuplicate}
                        handleDelete={this.handleDelete}
                    />
                }

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.showModal}
                    onCancel={this.showModal}
                >
                    <div>
                        <div>
                            <FacebookOutlined className=" fa-facebook social-network-icon" />

                            <EditTwoTone className="ml-5" onClick={this.showFacebook} />

                            <CloseSquareTwoTone className="ml-5" onClick={this.showFacebook} />
                            {isShowFace ?
                                <div className="d-flex mt-3">
                                    <label>Link
                                </label>
                                    <Input className="ml-5"
                                        value={txtFace}
                                        onChange={this.onChangeFacebook}
                                    ></Input>
                                </div>
                                : ""

                            }
                        </div>
                        <div>
                            <YoutubeOutlined className=" fa-facebook social-network-icon" />

                            <EditTwoTone className="ml-5" onClick={this.showYoutube} />

                            <CloseSquareTwoTone className="ml-5" onClick={this.showFacebook} />
                            {isShowYou ?
                                <div className="d-flex mt-3">
                                    <label>Link
                                </label>
                                    <Input className="ml-5"
                                        value={txtYoutube}
                                        onChange={this.onChangeYouTube}

                                    ></Input>
                                </div>
                                : ""

                            }
                        </div>
                        <div>
                            <SkypeOutlined className=" fa-facebook social-network-icon" />

                            <EditTwoTone className="ml-5" onClick={this.showSkype} />

                            <CloseSquareTwoTone className="ml-5" onClick={this.showFacebook} />
                            {isShowSkype ?
                                <div className="d-flex mt-3">
                                    <label>Link
                                </label>
                                    <Input className="ml-5"
                                        value={txtSkype}
                                        onChange={this.onChangeSkype}
                                    ></Input>
                                </div>
                                : ""

                            }
                        </div>
                        <div>
                            <InstagramOutlined className=" fa-facebook social-network-icon" />

                            <EditTwoTone className="ml-5" onClick={this.showIntergram} />

                            <CloseSquareTwoTone className="ml-5" onClick={this.showFacebook} />
                            {isShowIntergram ?
                                <div className="d-flex mt-3">
                                    <label>Link
                                </label>
                                    <Input className="ml-5"
                                        value={txtIntergram}
                                        onChange={this.onChangeIntergram}
                                    ></Input>
                                </div>
                                : ""

                            }
                        </div>


                    </div>

                </Modal>

            </div >


        )
    }
}

export default IconsSocial
