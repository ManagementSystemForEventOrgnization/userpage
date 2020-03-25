import React from 'react';
import { connect } from 'react-redux'
import Header from './_layout/Header';
import Footer from './_layout/Footer';
import EventList from '../components/EventList';

class CategoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="category-detail">
                <Header />
                <h1>Category detail</h1>
                <EventList></EventList>
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


export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail)
