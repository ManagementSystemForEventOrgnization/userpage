import React from 'react';
import {Input, Button} from 'antd';
import {StarFilled } from '@ant-design/icons';


class Banner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }


    render(){
        return(
            <div className="banner">
                <h1 >EVENT IN YOUR HAND</h1>
                <h2 >Dễ dàng hơn với việc quản lý và tổ chức sự kiện ngay từ hôm nay</h2>

                <div className="create-event-now d-flex flex-row">
                    <Input placeholder="Nhập mới tên sự kiện muốn tạo ..."/>
                    <Button icon={<StarFilled/>} className="ml-5" size="large" shape="round" type="danger"> Tạo ngay</Button>
                       
                </div>
            </div>
      );
    }
}

export default Banner;