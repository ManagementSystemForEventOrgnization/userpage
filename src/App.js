import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WrappRouter from './routers/WrapRouter';


class App extends Component {

  render() {
    return (
      <WrappRouter />
    )
  }
}



export default App;
