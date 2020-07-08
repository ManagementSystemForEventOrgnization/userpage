import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-day-picker/lib/style.css';
import 'react-multi-carousel/lib/styles.css';

import 'react-chat-widget/lib/styles.css';

// import WrappRouter from './routers/WrapRouter';
import BaseRoute from './routers/BaseRoute';
import history from 'utils/history';

class App extends Component {
  // componentDidMount() {
  //   const script = document.createElement('script');
  //   const key = process.env.REACT_APP_DIRECTION_KEY;

  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
  //   script.async = true;
  //   document.body.appendChild(script);
  // }

  render() {
    return (
      <Router history={history}>
        <BaseRoute />
      </Router>
    );
  }
}

export default App;
