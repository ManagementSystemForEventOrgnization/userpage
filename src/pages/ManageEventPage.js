import React, { Component } from 'react';
import { connect } from 'react-redux';
import ManageEvent from '../containers/event/manageEvent/manageEvents';
// import { eventActions } from 'action/event.action';

class ManageEventPage extends Component {
  render() {
    const { banner, nameEvent } = this.props;
    return (
      <div>
        <div className="manageEvent">
          <div className="card-container">
            <div className="site-card-border-less-wrapper" >
              <div className="row   " style={{ padding: '8%' }}>
                <div className="col">
                  <img className="image" src={banner} alt="logo"
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="col" >
                  <h2 style={{ color: 'black', textAlign: 'center', marginTop: '25%' }}>
                    {nameEvent}
                  </h2>
                </div>
              </div>
            </div>

            <ManageEvent match={this.props.match}></ManageEvent>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  banner: state.event.banner,
  nameEvent: state.event.nameEvent,
});

// const mapDispatchToProps = (dispatch) => ({
//   getEventInfo: (urlWeb) => dispatch(eventActions.getEventInfo(urlWeb)),
// });

export default connect(mapStateToProps, null)(ManageEventPage);
