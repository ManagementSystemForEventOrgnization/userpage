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
                    ticket: 15,

                },
                {
                    id: 2,
                    daySchedule: "27 jun, 2015 ",
                    url: src,
                    title: " NAM ENIM EROS ",
                    description: "8 Rue de Montpensier  ",
                    ticket: 15,

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
    render() {


        const { scheduelText } = this.state;
        return (

            <div className="child-block" >

                <div >
                    <h5>Scheduel</h5>
                    {scheduelText.map((scheduel, index) =>
                        <div className="child-block" key={index}>
                            <PlusOutlined
                                onClick={() => this.onClickAddScheduel(scheduel.id)}
                            />
                            <DeleteOutlined className="ml-5 " onClick={() => this.removeOption(scheduel)} />
                            <div className="row mt-1" >
                                <div className="col-2 mt-5 ml-4" >

                                    <Text content={scheduel.daySchedule} />

                                </div>
                                <div className=" col-2">
                                    <Image url={scheduel.url}
                                        height={25}
                                    />
                                </div>

                                <div className="mt-5 col-5">
                                    <Text content={scheduel.title} />
                                    <div className="mt-3">
                                        <Text content={scheduel.description} />
                                    </div>
                                </div >
                                <div className="mt-5 col">
                                    <Text content={scheduel.ticket} />
                                </div>
                                <div className=" mt-5 col">
                                    <ButtonBlock content={"buy ticket"} />
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
