import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD1H1yI7Du64fUQ3Max9uA6Ot9WkAALvsU",
  authDomain: "authentication-custom-backend.firebaseapp.com",
  projectId: "authentication-custom-backend",
  storageBucket: "authentication-custom-backend.appspot.com",
  messagingSenderId: "810099620012",
  appId: "1:810099620012:web:3321fcca71b023ecd28709",
  measurementId: "G-57Y8W4C4JY"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
