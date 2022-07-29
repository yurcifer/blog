import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8OiwHmRSQWjpW4JZtBkV33zgPXulVJVk",
  authDomain: "blog-390d7.firebaseapp.com",
  projectId: "blog-390d7",
  storageBucket: "blog-390d7.appspot.com",
  messagingSenderId: "623218025572",
  appId: "1:623218025572:web:5511ace08267f77e2b2b71"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App app={app}/>} />
      <Route path="/login" element={<Login auth={auth}/>} />
    </Routes>
  </BrowserRouter>
);
