import React from 'react';
import { connect } from 'react-redux'
import Header from '../containers/share/_layout/Header';
import Footer from '../containers/share/_layout/Footer';
// import EventList from '../components/EventList';
import ButtonsEvent from  '../containers/event/ButtonsEvent';
import { Button } from 'antd';
class CategoryDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="category-detail">
                <Header />
                
                <h1 className="mt-5">Category detail</h1>

                 <ButtonsEvent className="mt-2"></ButtonsEvent>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailPage)
