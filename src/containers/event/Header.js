import React, { Component } from 'react';
import { Menu, Modal, Tabs } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { connect } from 'react-redux';
import { EditTwoTone } from '@ant-design/icons';

import EditText from './templates/ui-elements/shares/EditText';
import { HeaderState } from './templates/ui-elements/stateInit/HeaderState';
import PaddingAndMargin from './templates/ui-elements/shares/PaddingAndMargin';
import ChangeColorModal from './templates/ui-elements/shares/ChangeColorModal';
const { TabPane } = Tabs;

class Header extends Component {
  constructor(props) {
    super(props);
    const { style } = this.props;
    this.state = style
      ? { ...style }
      : {
          ...HeaderState(this.props),
          isCollapsed: false,
        };
  }

  componentDidMount = () => {
    // const { editable } = this.props;
    // if (editable) {
    //   this.handleStoreStyleHeader();
    // }
  };

  onChangeValue(newValue, valueParam) {
    this.setState({
      [valueParam]: newValue,
    });
    setTimeout(this.handleStoreStyleHeader(), 3000);
  }

  handleStoreStyleHeader = () => {
    // const currentStyle = this.state;
    // const { storeStyleHeader } = this.props;
    // storeStyleHeader(currentStyle);
  };

  checkActive = (child) => {
    const { currentPage } = this.props;
    const result = child.findIndex((item) => item.id === currentPage);
    return result === -1 ? true : false;
  };

  collapsedModal = () => {
    const { isCollapsed } = this.state;
    this.setState({
      isCollapsed: !isCollapsed,
    });
  };

  render() {
    const { pages, currentPage, editable } = this.props;
    const {
      isCollapsed,
      fonts,
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
    };
    return (
      <div className="d-flex">
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
                disabled={editable && item.id !== currentPage}
              >
                {item.title}
              </Menu.Item>
            ) : (
              <SubMenu
                key={item.id}
                title={<span>{item.title}</span>}
                disabled={editable && this.checkActive(item.child)}
              >
                {item.child.map((child) => (
                  <Menu.Item key={child.id}>{child.title}</Menu.Item>
                ))}
              </SubMenu>
            )
          )}
        </Menu>

        {editable && (
          <div className="ml-auto icons-handle">
            <EditTwoTone
              style={iconStyle}
              onClick={this.collapsedModal}
              className="mt-4"
            />
          </div>
        )}

        {editable && (
          <Modal
            title="Header"
            visible={isCollapsed}
            width={600}
            onOk={this.collapsedModal}
            onCancel={this.collapsedModal}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Text" key="1"></TabPane>

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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pages: state.event.pages,
  currentPage: state.event.currentPage,
});

export default connect(mapStateToProps, null)(Header);
