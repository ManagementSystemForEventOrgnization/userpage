import React, { Component } from 'react'
import { v4 as uuid } from "uuid";
import {
    Menu, Modal, Button, Input,
    Tabs,
} from 'antd';

import {
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';

import DropdownBlocks from '../atoms/DropDown';
import TextBlocks from '../atoms/Text';
import EditText from '../shares/EditText';




const { SubMenu } = Menu;
const { TabPane } = Tabs;

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
            color: "black",
            margin: [1, 1, 1, 1],
            padding: [1, 1, 1, 1]


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

    handleChangeFonts = value => {
        this.setState({
            activeFontFamily: value
        })
    }

    handleChangeColor = value => {
        this.setState({
            color: value
        })
    }

    handleChangeBackground = value => {
        this.setState({
            background: value
        })
    }

    onChangePadding = value => {
        this.setState({
            padding: value
        })
    }

    onChangeMargin = value => {
        this.setState({
            margin: value
        })
    }


    render() {
        const { key } = this.props;

        const { visible, menuName, isShowAdd,
            inputValue, activeFontFamily,
            lineText, letterText, align, tranform,
            background, color,
            margin, padding
        } = this.state;

        const divStyle = {

            textAlign: align,
            textTransform: tranform,
            background: background,
            marginTop: `${margin[0]}%`,
            marginLeft: `${margin[1]}%`,
            marginRight: `${margin[2]}%`,
            marginBottom: `${margin[3]}%`,
            paddingTop: `${padding[0]}%`,
            paddingLeft: `${padding[1]}%`,
            paddingRight: `${padding[2]}%`,
            paddingBottom: `${padding[3]}%`,
        }

        const menuStyle = {
            color: color,
            fontFamily: activeFontFamily,
            fontSize: inputValue,
            lineHeight: lineText + "%",
            letterSpacing: letterText,
        }
        return (
            <div style={divStyle} className="child-block">
                <div onClick={this.handleEditMenu} >
                    <Menu key={key} mode='horizontal' style={menuStyle}  >
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
                                            sub.items.map(item => <Menu.Item key={item.name}>{item.name}</Menu.Item>)
                                        }
                                    </SubMenu>
                            )
                        }
                    </Menu>
                </div>

                <Modal
                    title="Header"
                    visible={visible}
                    width={700}
                    onOk={this.handleEditMenu}
                    onCancel={this.handleEditMenu}
                >
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab="Text" key="1">
                            {
                                menuName.map(sub =>

                                    <div key={sub.id}>
                                        <div className="d-flex  mt-2">
                                            <div className="mr-5">
                                                <TextBlocks
                                                    content={sub.title} id={sub.id}
                                                    handleOnChangeTextBlock={this.handleOnChangeTextBlock} />

                                            </div>

                                            <DeleteOutlined className=" mt-2" onClick={() => this.removeOption(sub)} />
                                        </div>
                                        <div className="d-flex mt-2"> <p>Thêm các thuộc tính con : </p>
                                            <span className="ml-5"  > <DropdownBlocks options={sub.items} > </DropdownBlocks></span>
                                        </div>
                                    </div>

                                )}

                            {isShowAdd ?
                                <div className="d-flex mt-2" >
                                    <Input value={this.state.txtname} onChange={this.onNameChange} />
                                    <Button type="primary" onClick={() => { this.onClickAdd(); this.OnClickOption() }}>done </Button>
                                </div>
                                : ''
                            }

                            <Button className="mt-3" onClick={this.OnClickOption}
                                shape="circle"> <span>  <PlusOutlined /> </span>

                            </Button>
                        </TabPane>
                        <TabPane tab="Style" key="2">
                            <EditText
                                fonts={activeFontFamily}
                                fontSize={inputValue}
                                lineText={lineText}
                                letterSpacing={letterText}
                                color={color}
                                background={background}
                                margin={margin}
                                padding={padding}

                                handleChangeFonts={this.handleChangeFonts}
                                handleChangeFontSize={this.onChange}
                                handleChangeLetterSpacing={this.onChangeLetterSpace}
                                handleChangeLineHeight={this.onChangeLineHeight}

                                handleChangeTextAlign={this.onChangeTextAlign}
                                handleChangeTextTranform={this.onChangeTextTranform}
                                handleChangeTextColor={this.handleChangeColor}
                                handleChangeBackground={this.handleChangeBackground}

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

export default HeaderBlock;
