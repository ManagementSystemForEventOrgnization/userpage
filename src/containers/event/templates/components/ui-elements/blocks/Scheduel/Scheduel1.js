import React, { Component } from 'react'
import TextsBlock from '../../atoms/Text';
import { v4 as uuid } from "uuid";
import { Row, Col, Modal, Tabs } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import EditText from '../../shares/EditText';
class Scheduel1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            txtTime: "",
            txtTitle: "",
            txtDescription: "",
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0],
            background: "white",
            fontSize: 20,
            fonts:  "Times New Roman",
            lineText: 80,
            letterSpacing: 0,
            textAlign: '',
            tranform: ' ',
            color: "black",

            scheduelText: [
                {
                    id: 1,
                    time: "8 : 00 AM",
                    title: " Coffee & Conversation",
                    description: "Coffee is usually brewed immediately before drinking. In most areas, coffee may be purchased unprocessed, or already roasted, or already"
                },
                {
                    id: 2,
                    time: "8 : 00 AM",
                    title: " Coffee & Conversation",
                    description: "Coffee is usually brewed immediately before drinking. In most areas, coffee may be purchased unprocessed, or already roasted, or already"
                }
            ]


        }
    }
    //show modal
    showModal = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    };

 

    onClickAddScheduel = (id) => {
        const {
            scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);

        scheduelText.push({
            id: uuid(),
            time: item.time,
            title: item.title,
            description: item.description
        })
        this.setState({
            scheduelText,
        })
    }
    handleChangeFonts = value => {
        this.setState({
            fonts: value
        })
    }

    handleChangeFontSize = value => {
        this.setState({
            fontSize: value
        })
        console.log(this.state.fontSize);
    }
    handleChangeLetterSpacing = value => {
        this.setState({
            letterSpacing: value
        })
    }
    handleChangeLineHeight = value => {
        this.setState({
            lineText: value
        })
    }

    handleChangeTextAlign = value => {
        this.setState({
            textAlign: value
        })
    }

    handleChangeTextTranform = value => {
        this.setState({
            tranform: value
        })
    }
    handleChangeTextColor = value => {
        this.setState({
            color: value
        })
    }

    handleChangeBackground = value => {
        this.setState({
            background: value
        })
    }

    handleChangeMargin = value => {
        this.setState({
            margin: value,
        })
    }

    handleChangePadding = value => {
        this.setState({
            padding: value,
        })
    }

    removeOption = (scheduel) => {
        const scheduelText = this.state.scheduelText.filter(e => e.id !== scheduel.id)
        this.setState({
            scheduelText,
        })
    }

    handleOnChangeTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.time = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }

    }
    handleOnChangeTitleTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.title = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }

    }
    handleOnChangeDesTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.description = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }

    }
    


    render() {
        const { scheduelText ,margin, padding,
         background, fontSize, fonts, lineText, letterSpacing, color, textAlign, tranform,
         } = this.state;
        const divStyle = {

            marginTop: `${margin[0]}%`,
            marginLeft: `${margin[1]}%`,
            marginRight: `${margin[2]}%`,
            marginBottom: `${margin[3]}%`,
            paddingTop: `${padding[0]}%`,
            paddingLeft: `${padding[1]}%`,
            paddingRight: `${padding[2]}%`,
            paddingBottom: `${padding[3]}%`,
            color: color,
            wordBreak: 'break-word',
            alignContent: 'center',
            background: background,
            fontSize: `${fontSize}px`,
            fontFamily: fonts,
            lineHeight: `${lineText}%`,
            letterSpacing: letterSpacing,
            textAlign: textAlign,
            textTransform: tranform,
        }

        return (
            <div className="child-block">
                <h5>Schedule</h5>
                <div onClick={this.showModal} style={divStyle}>

                    {scheduelText.map((scheduel, index) =>
                        <div className="child-block" >
                            <PlusOutlined onClick={() => this.onClickAddScheduel(scheduel.id)} />
                            <DeleteOutlined className="ml-5 " onClick={() => this.removeOption(scheduel)} />
                            <Row key={index} className="mt-4"  >

                                <Col span={18} push={6}>

                                    <TextsBlock id={scheduel.id} content={scheduel.title}
                                        handleOnChangeTextBlock={this.handleOnChangeTitleTextBlock}></TextsBlock>

                                    <div className="mt-3">
                                        <TextsBlock id={scheduel.id}
                                            handleOnChangeTextBlock={this.handleOnChangeDesTextBlock}
                                            content={scheduel.description}></TextsBlock>
                                    </div>
                                </Col>
                                <Col span={6} pull={18}>
                                    <TextsBlock content={scheduel.time} id={scheduel.id}
                                        handleOnChangeTextBlock={this.handleOnChangeTextBlock}></TextsBlock>
                                </Col>


                            </Row>
                        </div>
                    )}
                </div>
                <Modal
                    title="Scheduel"
                    visible={this.state.visible}
                    onOk={this.showModal}
                    onCancel={this.showModal}
                    width={700}
                >
                            <EditText
                                fonts={fonts}
                                fontSize={fontSize}
                                lineText={lineText}
                                letterSpacing={letterSpacing}

                                padding={padding}
                                margin={margin}
                                color={color}
                                background={background}

                                handleChangeFonts={this.handleChangeFonts}
                                handleChangeFontSize={this.handleChangeFontSize}
                                handleChangeLetterSpacing={this.handleChangeLetterSpacing}
                                handleChangeLineHeight={this.handleChangeLineHeight}

                                handleChangeTextAlign={this.handleChangeTextAlign}
                                handleChangeTextTranform={this.handleChangeTextTranform}
                                handleChangeTextColor={this.handleChangeTextColor}
                                handleChangeBackground={this.handleChangeBackground}

                                handleChangeMargin={this.handleChangeMargin}
                                handleChangePadding={this.handleChangePadding}

                            />
                </Modal>

            </div>
        )
    }
}

export default Scheduel1
