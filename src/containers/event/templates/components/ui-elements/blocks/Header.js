import React, { Component } from 'react'
import TextBlocks from '../atoms/Text';
import { v4 as uuid } from "uuid";
import FontPicker from "font-picker-react";
import { SketchPicker } from 'react-color';
import {
    Menu, Modal, Button, Input,
    Tabs, Col, Slider, Row, InputNumber, Select,
} from 'antd';
import { DeleteOutlined, PlusOutlined, BgColorsOutlined } from '@ant-design/icons';
import DropdownBlocks from '../atoms/DropDown';
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const { Option } = Select;

let index = 0;
class HeaderBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            isShowAdd: false,
            txtname: "",
            menuName: [{
                id: 1,
                title: 'home',
                items: [
                    { id: 1, name: "ca nhac" },
                    { id: 2, name: "the thao" }
                ]
            },
            {
                id: 2,
                title: "about",
                items: []
            }

            ],
            background: "white",
            inputValue: 20,
            showColor: false,
            isDesign: false,
            activeFontFamily: "Open Sans",
            lineText: 80,
            letterText: -2,
            align: '',
            tranform: ' ',
            color: "black"


        }
    }

    handleEditMenu = (e) => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    }
    OnClickOption = (e) => {
        const { isShowAdd } = this.state;
        this.setState({
            isShowAdd: !isShowAdd
        });

    };
    onClickAdd = () => {
        const { txtname, menuName } = this.state;

        menuName.push({
            id: uuid(),
            title: txtname || `add item ${index++}`,
            items: []
        })
        this.setState({
            menuName,
            txtname: ""
        })
    }
    onNameChange = event => {
        this.setState({
            txtname: event.target.value,
        });
    };

    removeOption = (item) => {

        const menuName = this.state.menuName.filter(e => e.id !== item.id)
        this.setState({
            menuName,
        })
    }
    handleOnChangeTextBlock = (id, value) => {

        const { menuName } = this.state;
        const item = menuName.find(ele => ele.id === id);
        const index = menuName.indexOf(item);

        if (index === -1) return;
        else {
            this.setState({
                menuName: [...menuName.slice(0, index), { id, title: value, items: item.items },
                ...menuName.slice(index + 1, menuName.length)]
            })
        }

    }
    //color
    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };
    handleChangeCompletecolor = (color) => {
        this.setState({ color: color.hex });
    };
    // textalign
    onChangeTextAlign = (value) => {
        this.setState({
            align: value
        })
    }
    // tranform
    onChangeTextTranform = (value) => {
        this.setState({
            tranform: value
        })
    }
    // open color
    onClickColor = e => {
        const { showColor } = this.state
        this.setState({
            showColor: !showColor
        });
    };
    //font size
    onChange = value => {
        this.setState({
            inputValue: value,
        });
    };

    // lineheight
    onChangeLineHeight = value => {
        this.setState({
            lineText: value,
        });
    };

    // letter space
    onChangeLetterSpace = value => {
        this.setState({
            letterText: value,
        });

    };
    showModalButton = () => {
        const { isDesign } = this.state;
        this.setState({
            isDesign: !isDesign
        });
    };


    render() {
        const { key } = this.props;
        const { menuName, isShowAdd, inputValue, activeFontFamily, lineText, letterText, align, tranform, background, color } = this.state;
        const divStyle = {
            color: color,
            fontFamily: activeFontFamily,
            fontSize: inputValue,
            lineHeight: lineText + "%",
            letterSpacing: letterText,
            textAlign: align,
            textTransform: tranform,
            background: background,
        }
        return (
            <div>
                <div className="child-block" onClick={this.handleEditMenu} >


                    <Menu key={key} mode='horizontal' style={divStyle}  >
                        {
                            menuName.map(sub =>
                                sub.items.length === 0 ?
                                    <Menu.Item key={sub.id}>{sub.title} </Menu.Item> :
                                    <SubMenu key={sub.id} title={
                                        <span >
                                            {sub.title}
                                        </span>
                                    }>
                                        {
                                            sub.items.map(item => <Menu.Item>{item.name}</Menu.Item>)
                                        }
                                    </SubMenu>
                            )
                        }
                    </Menu>
                </div>
                <Modal
                    title="Header"
                    visible={this.state.visible}
                    onOk={this.handleEditMenu}
                    onCancel={this.handleEditMenu}
                >
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Text" key="1">
                            {
                                menuName.map(sub =>
                                    <div>
                                        <div key={sub.id}>
                                            <div className="d-flex flex-row mt-2">
                                                <TextBlocks content={sub.title} id={sub.id} handleOnChangeTextBlock={this.handleOnChangeTextBlock}></TextBlocks>
                                                <DeleteOutlined className="ml-5 mt-2" onClick={() => this.removeOption(sub)} />
                                            </div>
                                            <div className="d-flex flex-row mt-2"> <p>Thêm các thuộc tính con : </p>
                                                <span className="ml-5"  > <DropdownBlocks options={sub.items} > </DropdownBlocks></span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            {isShowAdd ?
                                <div className="d-flex flex-row mt-5" >
                                    <Input value={this.state.txtname} onChange={this.onNameChange} />
                                    <Button type="primary" onClick={() => { this.onClickAdd(); this.OnClickOption() }}>done </Button>
                                </div>
                                : ''
                            }

                            <Button className="mt-5 " style={{ marginLeft: '40%' }} onClick={this.OnClickOption}
                            >  <PlusOutlined /> Add menu item
    
                        </Button>
                        </TabPane>
                        <TabPane tab="Design" key="2">
                            <div className="mt-2" >
                                <h6>Fonts</h6>
                                <div className=" d-flex flex-row">

                                    <FontPicker style={{ width: '100%' }}
                                        apiKey="AIzaSyB8e2BPKdZDsrXUC4sPv9gG6IzMpwf9GtY"
                                        activeFontFamily={this.state.activeFontFamily}
                                        onChange={nextFont =>
                                            this.setState({
                                                activeFontFamily: nextFont.family,
                                            })
                                        }
                                    />

                                </div>
                                <div className="mt-2">
                                    <h6>Font size(px)</h6>
                                    <Row>
                                        <Col span={12}>
                                            <Slider
                                                min={6}
                                                max={176}
                                                onChange={this.onChange}
                                                value={typeof inputValue === 'number' ? inputValue : 0}
                                            />
                                        </Col>
                                        <Col span={2}>
                                            <InputNumber
                                                min={6}
                                                max={176}
                                                style={{ margin: '0 16px', borderRadius: '15px' }}
                                                value={inputValue}
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </Row>
                                </div>

                                <div className="mt-2">
                                    <h6>Line Height(%)</h6>
                                    <Row>
                                        <Col span={12}>
                                            <Slider
                                                min={80}
                                                max={200}
                                                onChange={this.onChangeLineHeight}
                                                value={typeof lineText === 'number' ? lineText : 0}
                                            />
                                        </Col>
                                        <Col span={2}>
                                            <InputNumber
                                                min={80}
                                                max={200}
                                                style={{ margin: '0 16px', borderRadius: '15px' }}
                                                value={lineText}
                                                onChange={this.onChangeLineHeight}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-2">
                                    <p>Letter Spacing (px) </p>
                                    <Row>
                                        <Col span={12}>
                                            <Slider
                                                min={-2}
                                                max={10}
                                                onChange={this.onChangeLetterSpace}
                                                value={typeof letterText === 'number' ? letterText : 0}
                                            />
                                        </Col>
                                        <Col span={2}>
                                            <InputNumber
                                                min={-2}
                                                max={10}
                                                style={{ margin: '0 16px', borderRadius: '15px' }}
                                                value={letterText}
                                                onChange={this.onChangeLetterSpaceChange}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-2">
                                    <h6>Text Align</h6>
                                    <Select style={{ width: '100%' }} onChange={this.onChangeTextAlign}>
                                        <Option value="left">left</Option>
                                        <Option value="center">center</Option>
                                        <Option value="right">right</Option>
                                        <Option value="justify">justify</Option>
                                    </Select>
                                </div>
                                <div className="mt-2"  >
                                    <h6>Text Tranform</h6>
                                    <Select style={{ width: '100%' }} onChange={this.onChangeTextTranform}>
                                        <Option value="none">none</Option>
                                        <Option value="uppercase">uppercase</Option>
                                        <Option value="lowercase">lowercase</Option>
                                        <Option value="capitalize">capitalize</Option>
                                    </Select>
                                </div>

                            </div>
                            <div className="mt-2 d-flex flex-row">
                                <h6>Color</h6>
                                <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.onClickColor} />

                            </div>
                            <div className="mt-2 d-flex flex-row">
                                <h6>background</h6>
                                <BgColorsOutlined style={{ height: '50px', width: '50px' }} onClick={this.showModalButton} />

                            </div>
                            <Modal
                                title="Text design"
                                visible={this.state.isDesign}

                                onCancel={this.showModalButton}
                                width={300}
                                style={{ marginLeft: 820 }}
                                footer={[
                                    <Button key="ok" onClick={this.showModalButton} type="primary">
                                        OK
                               </Button>,
                                ]}

                            >
                                <SketchPicker color={this.state.background}
                                    onChangeComplete={this.handleChangeComplete} />

                            </Modal>

                            <Modal
                                title="Text design"
                                visible={this.state.showColor}

                                onCancel={this.onClickColor}
                                width={300}
                                style={{ marginLeft: 820 }}
                                footer={[
                                    <Button key="ok" onClick={this.onClickColor} type="primary">
                                        OK
                               </Button>,
                                ]} >

                                <SketchPicker color={this.state.color}
                                    onChangeComplete={this.handleChangeCompletecolor} />

                            </Modal>

                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default HeaderBlock;
