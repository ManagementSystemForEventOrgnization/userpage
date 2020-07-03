import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { Menu, Modal, Tabs, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { EditTwoTone, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { eventActions } from 'action/event.action';
import { Link } from 'react-router-dom';

import EditText from './templates/ui-elements/shares/EditText';
import { HeaderState } from './templates/ui-elements/stateInit/HeaderState';
import PaddingAndMargin from './templates/ui-elements/shares/PaddingAndMargin';
import ChangeColorModal from './templates/ui-elements/shares/ChangeColorModal';

const { TabPane } = Tabs;
const { SubMenu } = Menu;

class Header extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...HeaderState(this.props),
          isCollapsed: false,
          currentItem: {
            id: '',
            title: '',
            child: [],
          },
        };
  }

  componentDidMount = () => {
    const { editable } = this.props;
    if (editable) {
      this.currentItem();
    }
  };

  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
  }

  checkActive = (child) => {
    const { currentPage } = this.props;
    const result = child.findIndex((item) => item.id === currentPage);
    return result === -1 ? true : false;
  };

  openModal = () => this.setState({ isCollapsed: true });

  closeModal = () => {
    const { storeStyleHeader } = this.props;
    this.setState({ isCollapsed: false });
    storeStyleHeader(this.state);
  };

  handleClickMenuItem = (item) => {
    const { changeCurrentPage } = this.props;
    changeCurrentPage(item.id);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentPage !== this.props.currentPage) {
      this.currentItem();
    }
  };

  currentItem = () => {
    const { currentPage, pages } = this.props;
    for (let index in pages) {
      if (pages[index].child.length === 0) {
        if (pages[index].id === currentPage) {
          this.setState({
            currentItem: pages[index],
          });
        }
      } else {
        const childIndex = pages[index].child.findIndex(
          (item) => item.id === currentPage
        );
        if (childIndex !== -1) {
          this.setState({
            currentItem: pages[index],
          });
        }
      }
    }
  };

  handleAddNewChild = (currentItem) => {
    const { pages, changePages, currentPage } = this.props;
    const index = pages.findIndex((item) => item.id === currentItem.id);
    const newPages = [...pages];
    const newChildId = uuid();

    if (currentItem.child.length === 0) {
      newPages[index].child.push({
        id: newChildId,
        title: 'New Item',
      });
      changePages(newPages, newChildId);
    } else {
      newPages[index].child.push({
        id: uuid(),
        title: 'New Item',
      });
      changePages(newPages, currentPage);
    }
  };

  handleRemoveChild = (currentItem, childItem) => {
    const { pages, changePages, currentPage } = this.props;
    const index = pages.findIndex((item) => item.id === currentItem.id);
    let newPages = [...pages];

    const childIndex = currentItem.child.indexOf(
      (item) => item.id === childItem.id
    );
    currentItem.child.splice(childIndex, 1);
    newPages[index] = currentItem;
    if (currentItem.child.length === 0) {
      changePages(newPages, currentItem.id);
    } else changePages(newPages, currentPage);
  };

  handleChangeHeaderItem = (value, child) => {
    const { pages, currentPage, changePages } = this.props;
    let newPages = [...pages];

    let { currentItem } = this.state;
    if (!child) {
      currentItem.title = value;
    } else {
      const childIndex = currentItem.child.findIndex(
        (item) => item.id === child.id
      );
      currentItem.child[childIndex].title = value;
    }

    const pageIndex = newPages.findIndex((item) => item.id === currentItem.id);
    newPages[pageIndex] = currentItem;
    changePages(newPages, currentPage);
    this.setState(currentItem);
  };

  render() {
    const { pages, currentPage, editable, pending } = this.props;
    const { currentItem } = this.state;
    const id = this.props.webAddress || localStorage.getItem('webAddress');

    const {
      isCollapsed,
      fontSize,
      lineText,
      letterSpacing,
      padding,
      margin,
      color,
      background,
      textAlign,
      transform,
      fontWeight,
    } = this.state;
    const iconStyle = {
      fontSize: '20px',
    };

    const inputInModalStyle = {
      width: '200px',
    };

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
      lineHeight: `${lineText}%`,
      letterSpacing: letterSpacing,
      textAlign: textAlign,
      textTransform: transform,
      fontWeight: fontWeight,
      width: '100 %',
    };

    return (
      <div className="d-flex">
        {!pending && (
          <Menu
            mode="horizontal"
            style={divStyle}
            selectedKeys={currentPage}
            className="flex-fill"
          >
            {pages.map((item) =>
              item.child.length === 0 ? (
                <Menu.Item
                  key={item.id}
                  onClick={() => this.handleClickMenuItem(item)}
                  //   disabled={editable && item.id !== currentPage}
                >
                  {editable ? (
                    item.title
                  ) : (
                    <Link
                      to={`/event/${id}/${item.title}`}
                      onClick={() => this.handleClickMenuItem(item)}
                    >
                      {item.title}
                    </Link>
                  )}
                </Menu.Item>
              ) : (
                <SubMenu
                  key={item.id}
                  title={<span>{item.title}</span>}
                  //   disabled={editable && this.checkActive(item.child)}
                >
                  {item.child.map((child) => (
                    <Menu.Item
                      key={child.id}
                      onClick={() => this.handleClickMenuItem(child)}
                    >
                      {editable ? (
                        child.title
                      ) : (
                        <Link
                          to={`/event/${id}/${child.title}`}
                          onClick={() => this.handleClickMenuItem(child)}
                        >
                          {child.title}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </SubMenu>
              )
            )}
          </Menu>
        )}

        {editable && (
          <div className="ml-auto icons-handle">
            <EditTwoTone
              style={iconStyle}
              onClick={this.openModal}
              className="mt-4"
            />
          </div>
        )}

        {editable && (
          <Modal
            title="Header"
            visible={isCollapsed}
            width={600}
            onOk={this.closeModal}
            onCancel={this.closeModal}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Text" key="1">
                <div>
                  <div className="d-flex">
                    <p className="mr-5">Parent </p>
                    <Input
                      value={currentItem.title}
                      size="small"
                      style={inputInModalStyle}
                      onChange={(e) =>
                        this.handleChangeHeaderItem(e.target.value)
                      }
                    />
                  </div>

                  <Button
                    shape="round"
                    className="mt-5"
                    onClick={() => this.handleAddNewChild(currentItem)}
                  >
                    <PlusOutlined /> Add child
                  </Button>

                  {currentItem.child.length !== 0 && (
                    <div className="pl-5">
                      {currentItem.child.map((item) => (
                        <div className="d-flex mt-2" key={item.id}>
                          <p className="mr-5">Child </p>
                          <Input
                            value={item.title}
                            size="small"
                            disabled={currentPage !== item.id}
                            style={inputInModalStyle}
                            onChange={(e) =>
                              this.handleChangeHeaderItem(e.target.value, item)
                            }
                          />

                          <DeleteOutlined
                            className="ml-5 mt-1"
                            onClick={() =>
                              this.handleRemoveChild(currentItem, item)
                            }
                            style={{ fontSize: '20px', color: 'red' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabPane>

              <TabPane tab="Style" key="2">
                <EditText
                  fontSize={fontSize}
                  lineText={lineText}
                  letterSpacing={letterSpacing}
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pages: state.event.pages,
  currentPage: state.event.currentPage,
  webAddress: state.event.webAddress,
  pending: state.event.pending,
});

const mapDispatchToProps = (dispatch) => ({
  storeStyleHeader: (style) => dispatch(eventActions.storeHeaderStyle(style)),
  changeCurrentPage: (id) => dispatch(eventActions.changeCurrentPage(id)),
  changePages: (pages, currentPage) =>
    dispatch(eventActions.changePages(pages, currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
