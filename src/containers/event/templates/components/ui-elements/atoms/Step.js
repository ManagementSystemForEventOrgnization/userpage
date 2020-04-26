import React, { Component } from 'react'
import { Steps, Modal, Tabs, Select } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { v4 as uuid } from "uuid";


import TextBlock from '../atoms/Text';
import EditText from '../shares/EditText';

const { Step } = Steps;
const { TabPane } = Tabs;
const { Option } = Select;

class StepBlock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            steps: [
                {
                    id: 1,
                    title: "Finished",
                    description: "This is a description",

                },
                {
                    id: 2,
                    title: "Waiting",
                    description: "This is a description.",

                }
            ],
            current: 1,
            txtname: "",
            txtdescription: "",
            isAddOption: false,
            margin: [0, 0, 0, 0],
            padding: [0, 0, 0, 0],
            background: "white",
            fontSize: 20,
            fonts: "Times New Roman",
            lineText: 80,
            letterSpacing: 0,
            textAlign: '',
            tranform: ' ',
            color: "black",


        }
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
    };

    handleCancel = e => {

        this.setState({
            visible: false,
        });
    };

    removeOption = (item) => {

        const steps = this.state.steps.filter(e => e.id !== item.id)
        this.setState({
            steps,
        })
    }
    OnClickOption = (e) => {
        const { isAddOption } = this.state;
        this.setState({
            isAddOption: !isAddOption
        });

    };
    onClickAdd = (id) => {
        const { steps } = this.state;
        const item = steps.find(ele => ele.id === id);
        // const index = steps.indexOf(item);
        steps.push({
            id: uuid(),
            title: item.title,
            description: item.description

        })
        this.setState({
            steps,
        })
    }


    onNameChange = event => {
        this.setState({
            txtname: event.target.value,
        });
    };
    onDescriptionChange = event => {
        this.setState({
            txtdescription: event.target.value,
        });
    };


    handleOnChangeTextBlock = (id, value) => {

        const { steps } = this.state;
        const item = steps.find(ele => ele.id === id);
        const index = steps.indexOf(item);

        item.title = value
        if (index === -1) return;
        else {
            this.setState({
                steps: [...steps.slice(0, index), item,
                ...steps.slice(index + 1, steps.length)],
                txtname: "", txtdescription: ""
            })

        }

    }

    handleOnChangeDesTextBlock = (id, value) => {

        const { steps } = this.state;
        const item = steps.find(ele => ele.id === id);
        const index = steps.indexOf(item);

        item.description = value
        if (index === -1) return;
        else {
            this.setState({
                steps: [...steps.slice(0, index), item,
                ...steps.slice(index + 1, steps.length)],
                txtname: "", txtdescription: ""
            })

        }

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

    onChangeCurrent = value => {
        this.setState({
            current: value
        })
    }

    render() {
        const { key, editable } = this.props;
        const { steps,
            margin, padding,
            background, fontSize, fonts,
            lineText, letterSpacing, color,
            current,
            textAlign, tranform, } = this.state;
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
            <div className="child-block" style={divStyle}>

                <Steps size="small" current={current} key={key} onClick={this.showModal}>
                    {
                        steps.map(step =>

                            <Step key={step.id} title={step.title} description={step.description} />

                        )}
                </Steps>

                {editable && < Modal
                    title="Step Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Text" key="1">
                            <div className="mt-3 d-flex">
                                <h6 className="mr-5">Current Step : </h6>
                                <Select
                                    placeholder="Choose current step"
                                    onChange={this.onChangeCurrent}
                                    className="ml-5"
                                >
                                    {
                                        steps.map((item, index) => <Option key={item} value={index}>{index + 1}</Option>)
                                    }
                                </Select>
                            </div>
                            {
                                steps.map(step =>
                                    <div key={step.id} className="mt-3">
                                        <div className="d-flex row">
                                            <div className="col">
                                                <TextBlock content={step.title}
                                                    id={step.id}
                                                    handleOnChangeTextBlock={this.handleOnChangeTextBlock} />
                                            </div>
                                            <div className="col">

                                                <PlusOutlined onClick={() => this.onClickAdd(step.id)} />
                                                <DeleteOutlined className="ml-5" onClick={() => this.removeOption(step)} />
                                            </div>

                                        </div>
                                        <TextBlock content={step.description}
                                            id={step.id}
                                            handleOnChangeTextBlock={this.handleOnChangeDesTextBlock} />

                                    </div>

                                )
                            }
                        </TabPane>
                        <TabPane tab="Design" key="2">
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
                        </TabPane>
                    </Tabs>

                </Modal>
                }

            </div >

        )
    }
}

export default StepBlock;
