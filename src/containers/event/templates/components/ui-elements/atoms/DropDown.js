import React, { Component } from 'react'
import { v4 as uuid } from "uuid";
import { Input, Modal, Select, Button, } from 'antd';
import { PlusOutlined, DeleteOutlined, } from '@ant-design/icons';
import TextBlock from './Text';

let index = 0;

class DropDownBlock extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: this.props.options ? this.props.options : [{ id: 1, name: 'haha' }],
            txtname: "",
            isAddOption: false,
            isRename: false,
        }
    }

    onNameChange = event => {
        this.setState({
            txtname: event.target.value,
        });
    };


    onChangeReName = event => {
        const { items } = this.state;
        items.name = event.target.value
        this.setState({
            items: items
        });
    };


    onClickAdd = () => {
        const { txtname, items } = this.state;

        items.push({
            id: uuid(),
            name: txtname || `add item ${index++}`
        })
        this.setState({
            items,
            txtname: ""
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };

    OnClickOption = (e) => {
        const { isAddOption } = this.state;
        this.setState({
            isAddOption: !isAddOption
        });

    };

    OnClickRename = (e) => {
        const { isRename } = this.state;
        this.setState({
            isRename: !isRename
        });
        // console.log(this.state.isRename);

    };

    removeOption = (item) => {
        const { idMenu, removeOptionChild } = this.props;
        const items = this.state.items.filter(e => e.id !== item.id)
        console.log(idMenu, items)

        if (idMenu) {
            removeOptionChild(idMenu, items)
        }
        this.setState({
            items
        })
    }



    onChangeTextBlock = (id, value) => {
        const { idMenu, handleUpdateChild } = this.props;
        const { items } = this.state;
        const item = items.find(ele => ele.id === id);
        const index = items.indexOf(item);
        if (index === -1) return;
        else {
            this.setState({
                items: [...items.slice(0, index), { id, name: value }, ...items.slice(index + 1, items.length)]
            })
        }


        if (idMenu) {
            handleUpdateChild(idMenu, this.state.items);
        }


    }

    render() {
        const { key } = this.props;
        const { items, isAddOption } = this.state;

        const constructOptions = options =>
            options.map(data => (
                <Select.Option key={uuid()} value={data.id}>
                    {data.name}
                </Select.Option>
            ));

        return (
            <div className="sortable-element" >
                <Select key={key} id={"dropdown" + uuid()} style={{ width: 100 }}
                    onClick={this.showModal}
                >
                    {constructOptions(items)}
                </Select>
                <Modal
                    title="Dropdown"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={300}
                >
                    <div>
                        {items.map((item) =>
                            <div key={item.id} className="d-flex row mt-2 " >
                                <div className="col">
                                    <TextBlock content={item.name} id={item.id} handleOnChangeTextBlock={this.onChangeTextBlock}></TextBlock>
                                </div>
                                <div className="col">
                                    <DeleteOutlined className="ml-5" onClick={() => this.removeOption(item)} />
                                </div>

                            </div>
                        )
                        }

                        {isAddOption ?
                            <div className="d-flex flex-row mt-3" >
                                <Input value={this.state.txtname} onChange={this.onNameChange} />
                                <Button type="primary" onClick={() => { this.onClickAdd(); this.OnClickOption() }}>done </Button>
                            </div>
                            : ''
                        }

                        <Button className="mt-5 ml-5 " onClick={this.OnClickOption}
                        >  <PlusOutlined /> Add Item

                        </Button>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default DropDownBlock
