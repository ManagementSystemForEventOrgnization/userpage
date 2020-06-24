import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../containers/share/_layout/Header';
import ManageEvent from '../containers/event/manageEvent/manageEvents';
// import { eventActions } from 'action/event.action';

class ManageEventPage extends Component {
  // componentDidMount = () => {
  //   this.props.getEventInfo(localStorage.getItem('webAddress'));
  //   this.props.getCategories();
  // };

  render() {
    const { banner, nameEvent } = this.props;
    return (
      <div>
        <div className="fixed-top">
          <Header />
        </div>
        <div className="manageEvent">
          <div className="card-container">
            <div className="site-card-border-less-wrapper">
              <div className="row   ">
                <div className="col">
                  <img className="image" src={banner} alt="logo" />
                </div>
                <div className="col" style={{ padding: '8%', color: 'white' }}>
                  <h1 style={{ color: 'white', textAlign: 'center' }}>
                    {nameEvent}
                  </h1>
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
