import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WrappRouter from './routers/WrapRouter';

class App extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    const key = process.env.REACT_APP_DIRECTION_KEY;

    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return <WrappRouter />;
  }
}

export default App;
