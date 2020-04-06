import React from 'react';
import { connect } from 'react-redux'

import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined, StarFilled } from '@ant-design/icons';


const { confirm } = Modal;



class GeneralInfoEventModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    showConfirm = () => {
        confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }

    render() {
        return (
            <Button onClick={this.showConfirm} icon={<StarFilled />} size="large" type="danger">Khám Phá Ngay</Button>
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfoEventModal)
