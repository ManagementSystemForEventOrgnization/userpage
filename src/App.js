import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WrappRouter from './routers/WrapRouter';


class App extends Component {

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=vietnam";
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    return (
      <WrappRouter />
    )
  }
}



export default App;
