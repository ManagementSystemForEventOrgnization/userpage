import React, { Component } from 'react';

import Header from '../containers/share/_layout/Header';
import Footer from '../containers/share/_layout/Footer';

class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const style = {
      height: '100vh',
    };
    return (
      <div style={style}>
        <Header />
        <h1>ABOUT US !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>;
        <div className="fixed-bottom">
          <Footer />
        </div>
      </div>
    );
  }
}

export default AboutUs;
