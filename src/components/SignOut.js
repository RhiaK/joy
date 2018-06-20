import React from 'react';
import { doSignOut } from '../firebase/auth';
import './App.css';

const SignOutButton = () =>
  <button
  	className="sobut"
    type="button"
    onClick={doSignOut}
  >
    Sign Out
  </button>

export default SignOutButton;