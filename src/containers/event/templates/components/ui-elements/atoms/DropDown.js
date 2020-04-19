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
        const items = this.state.items.filter(e => e.id !== item.id)
        this.setState({
            items,
        })
    }
    onChangeTextBlock = (id, value) => {
        console.log("TCL : ", value);

        const { items } = this.state;
        const item = items.find(ele => ele.id === id);
        const index = items.indexOf(item);
        if (index === -1) return;
        else {
            console.log(items)
            this.setState({
                items: [...items.slice(0, index), { id, name: value }, ...items.slice(index + 1, items.length)]
            })
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
                >

                    {items.map((item) =>
                        <div key={item.id} className="d-flex flex-row mt-2 " >
                            <TextBlock content={item.name} id={item.id} handleOnChangeTextBlock={this.onChangeTextBlock}></TextBlock>
                            <DeleteOutlined className="ml-5" onClick={() => this.removeOption(item)} />

                        </div>
                    )
                    }

                    {isAddOption ?
                        <div className="d-flex flex-row mt-2" >
                            <Input value={this.state.txtname} onChange={this.onNameChange} />
                            <Button type="primary" onClick={() => { this.onClickAdd(); this.OnClickOption() }}>done </Button>
                        </div>
                        : ''
                    }

                    <Button className="mt-3"
                        shape="circle"> <span>  <PlusOutlined /> </span>

                    </Button>
                </Modal>

            </div>
        )
    }
}

export default DropDownBlock
