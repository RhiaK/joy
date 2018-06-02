import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBJAXLz-QqZmXA8jsoadfPPZHEZWVAt8XM",
    authDomain: "joyft-misty.firebaseapp.com",
    databaseURL: "https://joyft-misty.firebaseio.com",
    projectId: "joyft-misty",
    storageBucket: "",
    messagingSenderId: "948560327023"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
}