import React from 'react';
import { connect } from 'react-redux';
import { eventActions } from '../../action/event.action';

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
    const { page } = this.props;
    const blocks = page ? page[0].rows : [];

    console.log(blocks);

    return (
      <div>
        {blocks.map((item) => {
          console.log(item);
          let temp = item.options;
          let key = '"';
          if (temp.indexOf(key)) {
            console.log('yes');
            temp.replace(/"/g, "'");
          }
          console.log('After : ', temp);
          eval(temp);
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
