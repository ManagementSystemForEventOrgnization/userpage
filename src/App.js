import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'



import './App.css';
import Header from './containers/_layout/Header';
import Footer from './containers/_layout/Footer';
import HomePage from './containers/HomePage';
import Profile from './containers/Profile';
import NavBar from './components/NavBar';
import CategoryDetail from './containers/CategoryDetail';
import EventDetail from './containers/EventDetail';
import CreateEvent from './containers/CreateEvent';

require('dotenv').config()


function App() {
  return (

    <div className="">
      <Header />
      <Router>
        <NavBar/>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/create" component={CreateEvent} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/:category" component={CategoryDetail} />
          <Route exact path="/:category/:id" component={EventDetail} />
          
        </Switch >
      </Router>
      <Footer />
    </div >

  );
}

const mapStateToProps = state => ({
  // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(App)
