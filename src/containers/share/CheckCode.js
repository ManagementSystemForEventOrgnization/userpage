import React from 'react';
import { connect } from 'react-redux'
import {Input,  Button} from 'antd';



class CheckCode extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            code: '',
            err: ''
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render(){
        const {code, err} = this.state;
        const disactive = err || !code.trim()
        return(
            <div className="col mt-5 check-code" >

                <p className="notify-enter-code" >Hãy nhập mã code(đã được gửi trong gmail) để xác nhận tài khoản  </p>

                {err  && 
                    <div className="error-message mt-2 mb-2">{err}</div>
                }

                <div className=" mt-3 d-flex flex-row">
                    <Input 
                        value={code}
                        name="code"
                        onChange={this.onChange}
                        placeholder="Nhập mã code xác nhận  ..."/>

                    <Button  size="large" type="primary" disabled={disactive}> Xác nhận</Button>
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
  