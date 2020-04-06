import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'antd';

class EventDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
         <div>
         
         </div>
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
   
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
  