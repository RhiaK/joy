import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
   } from 'react-router-dom';

import Navigation from './Navigation';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import Inspiration from './Inspiration';
import Freebies from './Freebies';
import Subscribe from './Subscribe';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import Header from './Header';
import Footer from './Footer';
import * as routes from '../constants/routes';
import tulips from '../images/TULIP.png';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: null,
    };
  }

  componentDidMount() {
    const database=require('../firebase/firebase');
    database.auth.onAuthStateChanged(authenticated => {
      authenticated
        ? this.setState(() => ({ authenticated }))
        : this.setState(() => ({ authenticated: null }));
    });
    console.log(database.auth);
  }


  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route
            exact path={routes.SIGN_UP}
            component={() => <SignUpPage />}
          />
          <div className="signin">
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignInPage />}
          />
          </div>
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />
          <Route
            exact path={routes.HOME}
            component={() => <HomePage />}
          />
          <Route
            exact path={routes.INSPIRATION}
            component={() => <Inspiration />}
          />
          <Route
            exact path={routes.FREEBIES}
            component={() => <Freebies />}
          />
          <Route
            exact path={routes.SUBSCRIBE}
            component={() => <Subscribe />}
          />
          <Navigation authUser={this.state.authentication} />
          <img className="img" src={tulips} alt="tulips"></img>
          <Footer />
        </div>
      </Router>
    )
  }
}      

export default App;
