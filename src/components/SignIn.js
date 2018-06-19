import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import { doSignInWithEmailAndPassword } from '../firebase/auth';
import './App.css';

const SignInPage = ({ history }) =>
  <div className="signinform">
    <h1>Sign In</h1>
    <SignInForm history={history} />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("signing in");
    console.log(email);
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;
    
    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form 
      onSubmit={this.onSubmit}>
        <input
          value={this.state.value}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={this.state.value}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};