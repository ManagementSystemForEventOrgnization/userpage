import React from 'react';
import { connect } from 'react-redux'



class EventDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <h1>Event detail</h1>
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
   
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
  