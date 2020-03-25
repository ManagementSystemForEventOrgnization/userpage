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
import CategoryDetail from './containers/CategoryDetail';
import EventDetail from './containers/EventDetail';
import CreateEvent from './containers/CreateEvent';
import Login from './containers/Login';
import Signup from'./containers/SignUp';
import NavBar from './components/NavBar';
require('dotenv').config()

const typeOfEvents = [	
  "Hội nghị",	
  "Thể thao",	
  "Du lịch",	
  "Sân khấu-Nghệ thuật",	
  "Tình nguyện",	
  "Workshop",	
  "Talkshow",	

]

function App() {
  const isLogin = false;

  return (

    <div className="">
      <Router>
        <Header />
        <NavBar typeOfEvents={typeOfEvents}/>
       
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/create" component={CreateEvent} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/:category" component={CategoryDetail} />
          <Route exact path="/:category/:id" component={EventDetail} />
        </Switch >
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
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
