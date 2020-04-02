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
                <h1  className="title-name">EVENT IN YOUR HAND</h1>
                <h2  className="title-name">Dễ dàng hơn với việc quản lý và tổ chức sự kiện ngay từ hôm nay</h2>

                <div className="create-event-now d-flex flex-row mt-4">
                    <Input placeholder="Nhập mới tên sự kiện muốn tạo ..."/>
                    <Button icon={<StarFilled/>}  size="large"  type="danger"> Tạo ngay</Button>
                       
                </div>
            </div>
      );
    }
}

export default Banner;
