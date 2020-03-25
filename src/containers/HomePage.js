import React from 'react';
import { connect } from 'react-redux'
import Event from '../components/Event'
import Banner from '../components/Banner';
import Header from './_layout/Header';
import Footer from './_layout/Footer';
import EventList from './EventList';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Header />
                <Banner />
                {/* <Event></Event> */}
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


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
