import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ auth }) {
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    setLogin('');
    setPwd('');
    signInWithEmailAndPassword(auth, login, pwd)
      .then(async ({ user }) => {
        const idToken = await user.getIdToken();
        await fetch('http://localhost:5000/sessionLogin', {
          credentials: 'include',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken }),
        });
        await auth.signOut();
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <form>
        <label>
          Login:
          <input onChange={e => setLogin(e.target.value)} value={login} />
        </label>
        <label>
          Password:
          <input onChange={e => setPwd(e.target.value)} type="password" value={pwd} />
        </label>
        <button onClick={e => submit(e)}>Login</button>
      </form>
    </>
  );
}
