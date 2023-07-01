import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
