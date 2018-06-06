import React from 'react';
import { auth } from '../firebase/firebase';
import './App.css';

const SignOutButton = () =>
  <button
  	className="sobut"
    type="button"
    onClick={auth.doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton;