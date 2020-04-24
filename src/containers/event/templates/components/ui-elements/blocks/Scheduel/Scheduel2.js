import React, { Component } from 'react'
import { v4 as uuid } from "uuid";
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import ButtonBlock from '../../atoms/Button';
import { Modal } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const src = 'https://res.cloudinary.com/dwt4njhmt/image/upload/v1586424285/unnamed_wf6wys.jpg'
class Scheduel2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            isShowForm: false,
            txtdaySchedule: " ",
            txtUrl: "",
            txtTitle: "",
            txtDescription: "",
            txtticket: "",

            scheduelText: [
                {
                    id: 1,
                    daySchedule: "27 jun, 2015",
                    url: src,
                    title: " NAM ENIM EROS RHONCUS",
                    description: "8 Rue de Montpensier 75001, Paris, France, 18:00 ",
                    ticket: '15$',
                    buttonText: "buy ticket"

                },
                {
                    id: 2,
                    daySchedule: "27 jun, 2015 ",
                    url: src,
                    title: " NAM ENIM EROS ",
                    description: "8 Rue de Montpensier  ",
                    ticket: '15$',
                    buttonText: "buy ticket"

                }
            ]

        }
    }
    showModal = () => {
        const { visible, } = this.state;
        this.setState({
            visible: !visible
        });
    };



    onClickAddScheduel = (id) => {
        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        scheduelText.push({
            id: uuid(),
            title: item.title,
            description: item.description,
            ticket: item.ticket,
            daySchedule: item.daySchedule,
            url: item.url,
            buttonText: item.buttonText,
        })
        this.setState({
            scheduelText,
        })
    }
    removeOption = (scheduel) => {
        const scheduelText = this.state.scheduelText.filter(e => e.id !== scheduel.id)
        this.setState({
            scheduelText,
        })
    }
    handleOnChangeDayTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.daySchedule = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }

    }
    handleOnChangeTitleTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.title = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }
        console.log("ticket:", scheduelText);



    }
    handleOnChangeDesTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.description = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }

    }
    handleOnChangeUrlTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.url = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }
        console.log(scheduelText);

    }
    handleOnChangeTicketTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.ticket = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }
        console.log("ticket:", scheduelText);

    }
    handleOnChangeButtonTextBlock = (id, value) => {

        const { scheduelText } = this.state;
        const item = scheduelText.find(ele => ele.id === id);
        const index = scheduelText.indexOf(item);
        item.buttonText = value;
        if (index === -1) return;
        else {
            this.setState({
                scheduelText: [...scheduelText.slice(0, index),
                    item, ...scheduelText.slice(index + 1, scheduelText.length)]
            })
        }
        console.log("ticket:", scheduelText);

    }

    render() {


        const { scheduelText } = this.state;
        return (

            <div className="child-block" >

                <div >
                    <h5>Schedule</h5>
                    {scheduelText.map((scheduel, index) =>
                        <div className="child-block" key={index}>
                            <PlusOutlined
                                onClick={() => this.onClickAddScheduel(scheduel.id)}
                            />
                            <DeleteOutlined className="ml-5 " onClick={() => this.removeOption(scheduel)} />
                            <div className="row mt-1" >
                                <div className="col-2 mt-5 ml-4" >

                                    <Text content={scheduel.daySchedule}
                                        id={scheduel.id}
                                        handleOnChangeTextBlock={this.handleOnChangeDayTextBlock}
                                    />

                                </div>
                                <div className=" col-2">
                                    <Image url={scheduel.url}
                                        id={scheduel.id}
                                        handleOnChangeUrlTextBlock={this.handleOnChangeUrlTextBlock}
                                        height={25}

                                    />
                                </div>

                                <div className="mt-5 col-5">
                                    <Text content={scheduel.title}
                                        id={scheduel.id}
                                        handleOnChangeTextBlock={this.handleOnChangeTitleTextBlock}
                                    />
                                    <div className="mt-3">
                                        <Text content={scheduel.description}
                                            id={scheduel.id}
                                            handleOnChangeTextBlock={this.handleOnChangeDesTextBlock} />
                                    </div>
                                </div >
                                <div className="mt-5 col">
                                    <Text content={scheduel.ticket}
                                        id={scheduel.id}
                                        handleOnChangeTextBlock={this.handleOnChangeTicketTextBlock}
                                    />
                                </div>
                                <div className=" mt-5 col">
                                    <ButtonBlock content={scheduel.buttonText}
                                        id={scheduel.id}
                                        handleOnChangeButtonTextBlock={this.handleOnChangeButtonTextBlock}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Modal
                    title="Scheduel "
                    visible={this.state.visible}
                    onOk={this.showModal}
                    onCancel={this.showModal}
                >

                </Modal>

            </div>
        )
    }
}

export default Scheduel2
