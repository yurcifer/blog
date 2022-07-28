import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkfgvZgIK3cVFGNxBgB2uudggatMsP84Q",
  authDomain: "blog-e9e07.firebaseapp.com",
  projectId: "blog-e9e07",
  storageBucket: "blog-e9e07.appspot.com",
  messagingSenderId: "661437548761",
  appId: "1:661437548761:web:b6b3e43b3de7ff5e25d6c8"
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
