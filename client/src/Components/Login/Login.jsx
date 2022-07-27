import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './Login.module.scss';

export default function Login() {
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');
  useEffect(() => {
    console.log(styles);
  });

  function submit(e) {
    e.preventDefault();
    console.log(login, pwd);
    setLogin('');
    setPwd('');
  }
  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <form>
        <label>
          Login:
          <input onChange={(e) => setLogin(e.target.value)} value={login}/>
        </label>
        <label>
          Password:
          <input onChange={(e) => setPwd(e.target.value)} type="password" value={pwd}/>
        </label>
        <button onClick={e => submit(e)}>Login</button>
      </form>
    </>
  );
}
