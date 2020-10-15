import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAK7fslPXUJMZWWPGFgrndw6IXO2R3EUtU',
  authDomain: 'react-firebase-edecio.firebaseapp.com',
  databaseURL: 'https://react-firebase-edecio.firebaseio.com',
  projectId: 'react-firebase-edecio',
  storageBucket: 'react-firebase-edecio.appspot.com',
  messagingSenderId: '151996025508',
  appId: '1:151996025508:web:ec9fdb7f3cbe57dfd53431',
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
