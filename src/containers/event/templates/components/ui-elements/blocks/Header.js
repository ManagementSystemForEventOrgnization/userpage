import React, { Component } from 'react'
import { v4 as uuid } from "uuid";
import {
    Menu, Modal, Button, Input,
    Tabs,
} from 'antd';
import { Link } from 'react-router-dom';
import { DeleteTwoTone, PlusOutlined, } from '@ant-design/icons'
import TextBlocks from '../atoms/Text';
import EditText from '../shares/EditText';

const { SubMenu } = Menu;
const { TabPane } = Tabs;

class HeaderBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
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
            activeFontFamily: "",
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

    onClickAdd = () => {
        const { menuName } = this.state;
        menuName.push({
            id: uuid(),
            title: `New Page `,
            items: []
        })
        this.setState({
            menuName,
        })
    }

    removeOption = (item) => {
        const menuName = this.state.menuName.filter(e => e.id !== item.id)
        this.setState({
            menuName,
        })
    }

    removeOptionChild = (idMenu, sub) => {
        const { menuName } = this.state;
        let item = menuName.find(ele => ele.id === idMenu);
        const items = item.items.filter(e => e.id !== sub.id);
        this.handleUpdateChild(idMenu, items);
    }

    handleOnChangeTextBlock = (id, value) => {
        const { menuName } = this.state;
        const item = menuName.find(ele => ele.id === id);
        const index = menuName.indexOf(item);
        item.title = value;
        if (index === -1) return;
        else {
            this.setState({
                menuName: [...menuName.slice(0, index), item,
                ...menuName.slice(index + 1, menuName.length)]
            })
        }

    }
    onClickChild = (id) => {
        const { menuName } = this.state;
        let item = menuName.find(ele => ele.id === id);
        item.items.push({
            id: uuid(),
            name: "new child "
        })
        this.handleUpdateChild(id, item.items);
    }

    handleUpdateChild = (id, sub) => {
        const { menuName } = this.state;
        let item = menuName.find(ele => ele.id === id);
        const index = menuName.indexOf(item);
        if (index === -1) return;
        else {
            item.items = sub;
            this.setState({
                menuName: [...menuName.slice(0, index), item,
                ...menuName.slice(index + 1, menuName.length)]
            })
        }
    }
    handleUpdateTextChild = (id, name, idChild) => {
        const { menuName } = this.state;
        let item = menuName.find(ele => ele.id === id);
        const items = item.items.find(ele => ele.id === idChild);
        const index = item.items.indexOf(items)
        items.name = name;
        if (index === -1) return;
        else {
            const SubMenu = [...item.items.slice(0, index), items,
            ...item.items.slice(index + 1, item.items.length)]
            this.handleUpdateChild(id, SubMenu);
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
        const { key, editable } = this.props;

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
                                    <Menu.Item key={sub.id}><Link to="">{sub.title}</Link> </Menu.Item> :
                                    <SubMenu title={
                                        <span >
                                            {sub.title}
                                        </span>
                                    }>
                                        {
                                            sub.items.map(item => <Menu.Item key={item.name}><Link to="">{item.name}</Link></Menu.Item>)
                                        }
                                    </SubMenu>
                            )
                        }
                    </Menu>
                </div>
                {editable &&
                    <Modal
                        title="Header"
                        visible={visible}
                        width={600}
                        onOk={this.handleEditMenu}
                        onCancel={this.handleEditMenu}
                        maskClosable={true}
                    >
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Text" key="1">
                                {
                                    menuName.map(sub =>
                                        <div key={sub.id}>

                                            <div key={sub.id} className="d-flex row mt-2">
                                                <div className="col">

                                                    <TextBlocks content={sub.title} id={sub.id} handleOnChangeTextBlock={this.handleOnChangeTextBlock}></TextBlocks>

                                                </div>

                                                <div className="col">
                                                    <Button shape="round" onClick={() => this.onClickChild(sub.id)}
                                                    >  <PlusOutlined /> Add child

                                                  </Button>
                                                    <DeleteTwoTone className="ml-4 mt-2" onClick={() => this.removeOption(sub)} />
                                                </div>
                                            </div>
                                            <div className="col mt-2 ml-3">
                                                {
                                                    sub.items.map((item, index) =>
                                                        <div key={index} className="row">
                                                            <div className="col mt-2">
                                                                <TextBlocks content={item.name}
                                                                    id={sub.id}
                                                                    idChild={item.id}
                                                                    handleOnChangeTextBlockChild={this.handleUpdateTextChild}
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <DeleteTwoTone className="ml-4 mt-2" onClick={() => this.removeOptionChild(sub.id, item)} />

                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div>

                                    )}


                                <Button type="primary" shape="round" className="mt-5 " style={{ marginLeft: '40%' }} onClick={this.onClickAdd}
                                >  <PlusOutlined /> Add Page

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

                }
            </div>
        )
    }
}

export default HeaderBlock;
