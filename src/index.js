import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app";


const firebaseConfig = {
  apiKey: "AIzaSyDym_IynpNjmdh30h0HlzLw5Lv9_w0fUhQ",
  authDomain: "react-chat-app-29f57.firebaseapp.com",
  databaseURL: "https://react-chat-app-29f57-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-29f57",
  storageBucket: "react-chat-app-29f57.appspot.com",
  messagingSenderId: "200801014479",
  appId: "1:200801014479:web:492912d7a6d6f9eeb91dba",
  measurementId: "G-VZS126K42R"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);


// const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


