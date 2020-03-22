import React from 'react';
import { 
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'



import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './containers/HomePage';
import Profile from './containers/Profile';
require('dotenv').config()


function App() {
  return (

    <div className="">
        <Header />
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/profile" component={Profile} />
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
