import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select, Modal } from 'antd';
import { Link } from 'react-router-dom'
import { StarFilled } from '@ant-design/icons';
import AutoCompletePlace from '../share/AutoCompletePlace';



const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const typeOfEvents = [
    "Hội nghị",
    "Thể thao",
    "Du lịch",
    "Sân khấu-Nghệ thuật",
    "Tình nguyện",
    "Workshop",
    "Talkshow"
]

class GeneralInfoEventModal extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            nameEvent: '',
            typeOfEvent: '',
            quantity: 100,
            address: ''
        };

    }

    onGenderChange = value => {
        this.formRef.current.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const { visible, confirmLoading, nameEvent, quantity } = this.state;
        const activeNext = nameEvent && quantity;
        const { isLogined } = this.props;
        return (
            <div>
                {
                    !isLogined ?
                        <Link to="/login">
                            <Button type="danger" icon={<StarFilled />} size="large" >
                                Hãy đăng nhập để khám phá ngay
                             </Button>
                        </Link>
                        :
                        <div>
                            <Button type="danger" icon={<StarFilled />} size="large" onClick={this.showModal}>
                                Khám phá ngay
                            </Button>
                            <Modal
                                title="Hãy cho chúng tôi biết một số thông tin cơ bản dưới đây"
                                visible={visible}
                                onOk={this.handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={this.handleCancel}
                                width="1000px"
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        Hủy
                                    </Button>,
                                    <Button key="submit" type="primary" loading={confirmLoading} disabled={!activeNext} onClick={this.handleOk}>
                                        Tiếp tục
                                    </Button>,
                                ]}
                            >
                                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                                    <Form.Item
                                        name="name"
                                        label="Tên sự kiện "
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input
                                            value={nameEvent}
                                            onChange={this.onChange}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="category"
                                        label="Loại sự kiện"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Chọn 1 loại sự kiện ở dưới"
                                            onChange={this.onGenderChange}
                                            allowClear
                                        >
                                            {
                                                typeOfEvents.map(item => <Option key={item} value={item}>{item}</Option>)
                                            }
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="quantity"
                                        label="Số lượng người tham gia dự kiến"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input
                                            value={quantity}
                                            onChange={this.onChange}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="address"
                                        label="Địa chỉ"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <AutoCompletePlace
                                        />
                                    </Form.Item>


                                </Form>
                            </Modal>
                        </div>

                }

            </div>
        );

    }
}

const mapStateToProps = state => ({
    isLogined: state.user.isLogined,
})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfoEventModal)
