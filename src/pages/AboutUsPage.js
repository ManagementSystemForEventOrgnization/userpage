import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutUs from 'pages/AboutUs'

function mapStateToProps(state) {
  return {};
}

class AboutUsPage extends Component {
  render() {
    return <div>


      <AboutUs />

    </div>;
  }
}

export default connect(mapStateToProps)(AboutUsPage);
