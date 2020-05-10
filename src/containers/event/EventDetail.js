import React from 'react';
import { connect } from 'react-redux';
import { eventActions } from '../../action/event.action';
import EventDescription3 from '../event/templates/components/ui-elements/blocks/eventDescription/EventDescription3';
class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
    };
  }

  componentDidMount = () => {
    // get id from url
    const { id, getEventDetail } = this.props;

    const eventId = id ? id : '5eb259b562bd742fe41c1205'; // should get id from url
    getEventDetail(eventId);
  };

  render() {
    // const { page } = this.props;
    // const blocks = page ? page[0].rows : [];

    const { blocks } = this.props;
    return (
      <div>
        {blocks.map((item) => {
          let temp = item.options; // item.option(ggsjhsjfj)
          //   console.log(item);
          //   if (item.child === 'Option 3') {
          //     return (
          //       <EventDescription3
          //         id={item.id}
          //         editable={false}
          //         style={item.style ? JSON.parse(item.style) : {}}
          //       />
          //     );
          //   }
          //eval(temp);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.event.blocks,
  id: state.event.id,
  page: state.event.page,
});

const mapDispatchToProps = (dispatch) => ({
  getEventDetail: (eventId) => dispatch(eventActions.getEventDetail(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
