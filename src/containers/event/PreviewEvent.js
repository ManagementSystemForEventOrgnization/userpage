import React from 'react';
import { connect } from 'react-redux';
import { eventActions } from '../../action/event.action';

class PreviewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // const { id, getEventDetail } = this.props;
    // const eventId = id ? id : '5eb259b562bd742fe41c1205'; // should get id from url
    // getEventDetail(eventId);
  };

  render() {
    // const { page } = this.props;
    // const blocks = page ? page[0].rows : [];
    const { blocks } = this.props;

    return (
      <div>
        {blocks.map((item) => {
          return item.options({
            key: item.id,
            editable: false,
            style: item.style,
          });
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewEvent);
