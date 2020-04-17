import React, { Component, Children } from 'react'
import TextBlocks from './Text';
import { Menu, Dropdown } from 'antd';
import DropDownBlock from './DropDown';
const { SubMenu } = Menu;


class HeaderBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
           
           subMenuName : "mo",
           

        }
    }

    render() {
        const { key } = this.props;
        const {subMenuName}=this.state;
        
        return (
            <div>
                
                  
              <Menu key={key} mode='horizontal'  >
            
            <Menu.Item><TextBlocks content="sport"></TextBlocks> </Menu.Item>
            <SubMenu title={subMenuName}>
            <Menu.Item><TextBlocks content="node"></TextBlocks> </Menu.Item>
            <Menu.Item><TextBlocks content="java"></TextBlocks> </Menu.Item>
             </SubMenu>
                  </Menu>
            </div>
        )
    }
}

export default HeaderBlock;
