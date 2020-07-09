import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import 'react-day-picker/lib/style.css';
import 'react-multi-carousel/lib/styles.css';

import 'react-chat-widget/lib/styles.css';
// import WrappRouter from './routers/WrapRouter';
import BaseRoute from './routers/BaseRoute';
import history from 'utils/history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <BaseRoute />
      </Router>
    );
  }
}

export default App;
