import React from 'react';
import { connect } from 'react-redux';

class EventDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Event Detail </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // map state of store to props
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
