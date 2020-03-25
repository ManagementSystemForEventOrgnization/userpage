import React from 'react';
import { connect } from 'react-redux'
import Header from './_layout/Header';
import Footer from './_layout/Footer';


class CategoryDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="category-detail">
                <Header/>
                <h1>Categoty detail</h1>
                <Footer/>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props
  
  })
  
  const mapDispatchToProps = (dispatch) => ({
   
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail)
  