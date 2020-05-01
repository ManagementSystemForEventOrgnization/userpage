import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Menu, Modal, Button, Tabs } from 'antd';
import { DeleteTwoTone, PlusOutlined, } from '@ant-design/icons';



import TextBlocks from '../atoms/Text';
import EditText from '../shares/EditText';
import IconsHandle from '../shares/IconsHandle';

import PaddingAndMargin from '../shares/PaddingAndMargin';
import ChangeColorModal from '../shares/ChangeColorModal';
import { eventActions } from '../../../../../../action/event.action';
import { HeaderState } from '../stateInit/HeaderState';

const { SubMenu } = Menu;
const { TabPane } = Tabs;

class HeaderBlock extends Component {
  constructor(props) {
    super(props)
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
        ...HeaderState(this.props),
      };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.handleStoreBlock();
    }
  };

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

  handleOnChangeTextBlock = (idItem, value) => {
    const { menuName } = this.state;
    const item = menuName.find(ele => ele.id === idItem);
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

  handleUpdateChild = (idItem, sub) => {
    const { menuName } = this.state;
    let item = menuName.find(ele => ele.id === idItem);
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
  handleUpdateTextChild = (idItem, name, idChild) => {
    const { menuName } = this.state;
    let item = menuName.find(ele => ele.id === idItem);
    const items = item.items.find(ele => ele.id === idChild);
    const index = item.items.indexOf(items)
    items.name = name;
    if (index === -1) return;
    else {
      const SubMenu = [...item.items.slice(0, index), items,
      ...item.items.slice(index + 1, item.items.length)]
      this.handleUpdateChild(idItem, SubMenu);
    }

  }

  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    this.handleStoreBlock();
  }


  handleStoreBlock = () => {
    const { blocks, storeBlocksWhenCreateEvent, id } = this.props;
    const currentStyle = this.state;

    let item = blocks.find((ele) => ele.id === id);

    if (item) {
      const index = blocks.indexOf(item);
      item.style = currentStyle;
      storeBlocksWhenCreateEvent([
        ...blocks.slice(0, index),
        item,
        ...blocks.slice(index + 1, blocks.length),
      ]);
    }
  };
  render() {

    const { key, editable, leftModal } = this.props;

    const { visible, menuName,
      margin,
      padding,
      background,
      fontSize,
      fonts,
      lineText,
      letterSpacing,
      textAlign,
      transform,
      color,
      fontWeight,
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
      textTransform: transform,
      fontWeight: fontWeight,
      width: '100 %',
    }
    const dropdownStyle = {
      color: color
    }


    return (
      <div className="child-block d-flex">
        <div style={{ width: '100%' }}>
          <Menu key={key} mode='horizontal'
            style={divStyle} >
            {
              menuName.map(sub =>
                sub.items.length === 0 ?
                  <Menu.Item key={sub.id}>
                    {sub.title}
                  </Menu.Item> :
                  <SubMenu key={sub.id}
                    title={
                      <span >
                        {sub.title}
                      </span>
                    }>
                    {
                      sub.items.map(item => <Menu.Item
                        key={sub.id}
                        style={dropdownStyle}
                      >{item.name}</Menu.Item>)
                    }
                  </SubMenu>
              )
            }
          </Menu>
        </div>
        {
          editable && (
            <IconsHandle
              collapseModal={this.handleEditMenu}
              handleDuplicate={this.handleDuplicate}
              handleDelete={this.handleDelete}
            />
          )
        }

        {
          editable &&
          <Modal
            title="Header"
            visible={visible}
            width={600}
            onOk={this.handleEditMenu}
            onCancel={this.handleEditMenu}
            className={
              leftModal ? ' mt-3 float-left ml-5' : 'float-right mr-3 mt-3'
            }
            style={leftModal ? { top: 40, left: 200 } : { top: 40 }}
          >
            <Tabs defaultActiveKey="1" >
              <TabPane tab="Text" key="1">
                {
                  menuName.map(sub =>
                    <div key={sub.id}>

                      <div key={sub.id} className="d-flex row mt-2">
                        <div className="col">

                          <TextBlocks content={sub.title} handleOnChangeTextBlock={(value) => this.handleOnChangeTextBlock(sub.id, value)}></TextBlocks>

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
                                  handleOnChangeTextBlock={(value) =>
                                    this.handleUpdateTextChild(sub.id, value, item.id)}
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
                  fonts={fonts}
                  fontSize={fontSize}
                  lineText={lineText}
                  letterSpacing={letterSpacing}
                  handleChangeFonts={(value) =>
                    this.onChangeValue(value, 'fonts')
                  }
                  handleChangeFontSize={(value) =>
                    this.onChangeValue(value, 'fontSize')
                  }
                  handleChangeLetterSpacing={(value) =>
                    this.onChangeValue(value, 'letterSpacing')
                  }
                  handleChangeLineHeight={(value) =>
                    this.onChangeValue(value, 'lineText')
                  }
                  handleChangeTextAlign={(value) =>
                    this.onChangeValue(value, 'textAlign')
                  }
                  handleChangeTextTranform={(value) =>
                    this.onChangeValue(value, 'transform')
                  }
                />

                <div className="mt-5 pl-2">
                  <PaddingAndMargin
                    padding={padding}
                    margin={margin}
                    handleChangeMargin={(value) =>
                      this.onChangeValue(value, 'margin')
                    }
                    handleChangePadding={(value) =>
                      this.onChangeValue(value, 'padding')
                    }
                  />
                </div>
                <div className="d-flex mt-5 pl-2">
                  <ChangeColorModal
                    title="Change Text Color"
                    color={color}
                    handleChangeColor={(value) =>
                      this.onChangeValue(value, 'color')
                    }
                  />
                  <ChangeColorModal
                    title="Change background"
                    color={background}
                    handleChangeColor={(value) =>
                      this.onChangeValue(value, 'background')
                    }
                  />
                </div>
              </TabPane>

            </Tabs>
          </Modal>

        }
      </div >
    )

  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
});

const mapDispatchToProps = (dispatch) => ({
  storeBlocksWhenCreateEvent: (blocks) =>
    dispatch(eventActions.storeBlocksWhenCreateEvent(blocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBlock);
