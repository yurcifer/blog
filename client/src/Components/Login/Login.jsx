import React from 'react';
import { useState } from 'react';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useFirebaseInit from '../../hooks/useFirebaseInit';
import { useStore } from 'react-redux';
import GoogleAuth from './GoogleAuth';
import setToken from '../../API/setToken';
import { useEffect } from 'react';
import checkAuth from '../../API/checkAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();
  const store = useStore();
  useFirebaseInit();

  async function navigateIfAuth() {
    checkAuth().then(result => {
      if (result) navigate('/');
    });
  }

  useEffect(() => {
    navigateIfAuth();
  }, []);

  async function submit(e) {
    console.log(store.getState().firebase);
    const { auth } = store.getState().firebase;
    e.preventDefault();
    setEmail('');
    setPwd('');
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, pwd);
      console.log('user ', user);
      const idToken = await user.getIdToken();
      await setToken(idToken);
      await auth.signOut();

      await navigateIfAuth();
    } catch (e) {
      console.log(e);
    }
    
  }
  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <form>
        <label>
          Login:
          <input onChange={e => setEmail(e.target.value)} value={email} />
        </label>
        <label>
          Password:
          <input onChange={e => setPwd(e.target.value)} type="password" value={pwd} />
        </label>
        <button onClick={e => submit(e)}>Login</button>
        <div className={styles.GoogleBtn}>
          <GoogleAuth navigateIfAuth={navigateIfAuth} />
        </div>
      </form>
    </>
  );
}
