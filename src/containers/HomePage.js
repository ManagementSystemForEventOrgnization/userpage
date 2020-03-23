import React from 'react';
import { connect } from 'react-redux'
import Event from '../components/Event'
import EventList from '../components/EventList';
import Banner from '../components/Banner';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Banner/>
                <Event></Event>
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
