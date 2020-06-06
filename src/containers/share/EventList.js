import React, { Component } from 'react'
import { Zoom } from 'react-slideshow-image';
import EventCard from './EventCard';
import { connect } from 'react-redux';
import { eventActions } from '../../action/event.action';

const images = [
    'https://static.rootsrated.com/image/upload/s--LbVVifxy--/t_rr_large_natural/a582hei6yo6itc6fvdjl.jpg',
    'https://d1ez3020z2uu9b.cloudfront.net/imagecache/blog-photos/6118.jpg',
    'https://acadienouvelle-6143.kxcdn.com/wp-content/uploads/2018/06/image.jpg',
    '',
    ''
];



const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true
}

class EventList extends Component {
    componentDidMount = () => {
        const { getListEvent, hlEvent } = this.props;
        // const { pageNumber, numberRecord } = this.state;

        // console.log(pageNumber, numberRecord);

        console.log("mo", hlEvent);
        getListEvent();
        // getListEventUpComing(pageNumber, numberRecord);

    };
    render() {

        return (
            <div className="event-list mt-5">
                <div className="slide-container">
                    <Zoom {...zoomOutProperties}>
                        {
                            images.map((each, index) => <EventCard key={index} style={{ width: "100%" }} src={each} />)
                        }
                    </Zoom>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        hlEvent: state.event.hlEvent,
    };
};

const mapDispatchToProps = (dispatch) => ({
    // getListEventUpComing: (pageNumber, numberRecord) => dispatch(eventActions.getListEventUpComing(pageNumber, numberRecord)),
    // // getListEvent: () => dispatch(eventActions.getListEvent()),
    getListEvent: () => dispatch(eventActions.getListEvent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
