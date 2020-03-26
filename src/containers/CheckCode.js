import React from 'react';
import { connect } from 'react-redux'
import {Input, Form, Button} from 'antd';
import {Link} from 'react-router-dom';



class CheckCode extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const urlIMG = "https://res.cloudinary.com/dklfyelhm/image/upload/v1584932729/Event/hand_iind0n.png";
        return(
            <div >
                <div  className=" row"  >
                    <Link to="/" className="col "> 
                        <img  src={urlIMG}/>
                    </Link> 
           <div className="col mt-5" style={{fontWeight:'bold'}}>
             <p style={{textAlign:"center"} }>Hãy nhập mã code(đã được gửi trong gmail) để xác nhận tài khoản  </p>
          <div className=" mt-3 d-flex flex-row">
           <Input placeholder="Nhập mã code xác nhận  ..."/>
            <Button  size="large" type="primary"> Xác nhận</Button>
            </div>
        </div> 
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
  