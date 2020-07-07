import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutUs from 'pages/AboutUs'
import Header from '../containers/share/_layout/Header';
import Footer from '../containers/share/_layout/Footer';
// import Banner from '../components/Banner';
function mapStateToProps(state) {
  return {};
}

class AboutUsPage extends Component {
  render() {
    return <div>
      <Header />


      <AboutUs />
      <Footer />
    </div>;
  }
}

export default connect(mapStateToProps)(AboutUsPage);
