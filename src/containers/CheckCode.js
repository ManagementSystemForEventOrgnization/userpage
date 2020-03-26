import React from 'react';
import { connect } from 'react-redux'
import {Input, Form, Button} from 'antd';




class CheckCode extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
          <div className="mt-5">
                <b >Mời bạn kiểm tra email để xác nhận đăng ký  </b>
            <div className=" mt-3 d-flex flex-row">
            <Input placeholder="Nhập mã code xác nhận  ..."/>
            <Button  size="large" type="primary"> Nhập </Button>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
   
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CheckCode)
  