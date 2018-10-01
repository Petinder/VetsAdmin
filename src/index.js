import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import './index.css';

firebase.initializeApp({
    apiKey: "AIzaSyAcns7GqLjohHfL-esXKUapbAvZ26P3kLU",
    authDomain: "patyndervetsadmin.firebaseapp.com",
    databaseURL: "https://patyndervetsadmin.firebaseio.com",
    projectId: "patyndervetsadmin",
    storageBucket: "patyndervetsadmin.appspot.com",
    messagingSenderId: "1063808229512"

});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
