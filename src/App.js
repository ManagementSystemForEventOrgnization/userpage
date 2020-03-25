import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'



import './App.css';
import HomePage from './containers/HomePage';
import Profile from './containers/Profile';
import CategoryDetail from './containers/CategoryDetail';
import EventDetail from './containers/EventDetail';
import CreateEvent from './containers/CreateEvent';
import Login from './containers/Login';
import Signup from'./containers/SignUp';
require('dotenv').config()


function App() {
  const isLogin = false;

  return (

    <div className="">
      <Router>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/profile">
                {isLogin ? <Profile/> : <Login/>}
            </Route>

            <Route exact path="/" component={HomePage} />
            <Route exact path="/home">
                <Redirect to="/" />
            </Route>
            <Route exact path="/:category" component={CategoryDetail} />
            <Route exact path="/create">
                {isLogin ? <CreateEvent/> : <Login/>}
            </Route>
            <Route exact path="/:category/:id" component={EventDetail} />
        </Switch >
        
      </Router>
  
    </div >

  );
}

const mapStateToProps = state => ({
  // map state of store to props

})

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(App)
