import React, { Component } from 'react';
import Footer from '../containers/share/_layout/Footer';
import Header from '../containers/share/_layout/Header';
import CreateHistory from '../containers/event/createHistory';

export default class CreateHistoryEventPage extends Component {
  render() {
    return (
      <div>
        <div className="fixed-top">
          <Header />
        </div>
        <CreateHistory></CreateHistory>
        <Footer />
      </div>
    );
  }
}
