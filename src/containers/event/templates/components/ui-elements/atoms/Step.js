import React, { Component } from 'react'
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Steps, Modal, Input, Button, } from 'antd';

import { v4 as uuid } from "uuid";
const { Step } = Steps;

let index = 0;
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
            txtname: "",
            txtdescription: "",
            isAddOption: false,

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
    onClickAdd = () => {
        const { txtname, steps, txtdescription } = this.state;

        steps.push({
            id: uuid(),
            title: txtname || `add title ${index++}`,
            description: txtdescription || `add description ${index++}`

        })
        this.setState({
            steps,
            txtname: "",
            txtdescription: "",
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

    onClickEdit = (id) => {
        const { steps } = this.state;
        const item = steps.find(ele => ele.id === id);

        this.setState({
            txtname: item.title,
            txtdescription: item.description,
        })
    }
    handleOnChangeTextBlock = (id) => {

        const { steps, txtname, txtdescription } = this.state;
        const item = steps.find(ele => ele.id === id);

        const index = steps.indexOf(item);


        if (index === -1) return;
        else {
            this.setState({
                steps: [...steps.slice(0, index), { id, title: txtname, description: txtdescription },
                ...steps.slice(index + 1, steps.length)],
                txtname: "", txtdescription: ""
            })

        }

    }

    render() {
        const { key } = this.props;
        const { steps, isAddOption, txtname, txtdescription } = this.state;

        return (
            <div className="child-block">
                <Steps size="small" current={1} key={key} style={{ width: 500 }} onClick={this.showModal}>
                    {
                        steps.map(step =>
                            <Step key={step.id} title={step.title} description={step.description} />

                        )}
                </Steps>

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {
                        steps.map(step =>

                            <div key={step.id}>
                                <div className="d-flex">
                                    <p>{step.title}</p>
                                    <DeleteOutlined className="ml-5" onClick={() => this.removeOption(step)} />
                                    <EditOutlined className="ml-5" onClick={() => { this.onClickEdit(step.id); this.OnClickOption() }} />
                                    {isAddOption ?
                                        <div className="d-flex">
                                            <Button className="ml-5" style={{ position: "absolute", top: '85%', left: '40%' }} type="primary" onClick={() => { this.onClickAdd(); this.OnClickOption() }}>save </Button>
                                            <Button type="primary" className="ml-2" style={{ position: "absolute", top: '85%', left: '60%', }} onClick={() => { this.handleOnChangeTextBlock(step.id); this.OnClickOption() }} >update</Button>

                                        </div>
                                        : " "
                                    }
                                </div>
                                <p> {step.description}</p>

                            </div>

                        )}


                    {isAddOption ?

                        <div className=" mt-3" >
                            <Input className="mt-3" placeholder="inter title" value={txtname} onChange={this.onNameChange} />
                            <textarea style={{ width: '100%', height: 80 }} className="mt-3" placeholder="inter description" value={txtdescription} onChange={this.onDescriptionChange} />

                        </div>
                        : ''

                    }

                    < Button className="mt-5 ml-5 " onClick={this.OnClickOption}
                    >  <PlusOutlined /> Add Item

                                 </Button>


                </Modal>
            </div >

        )
    }
}

export default StepBlock;
