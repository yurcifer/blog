import React from 'react';
import checkAuth from '../../API/checkAuth';
import logOut from '../../API/logOut';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './admin.module.scss';

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    checkAuth().then(auth => {
      if (!auth) navigate('/');
      setIsLoading(false);
    });
  }, []);
  function logOutClick() {
    logOut();
    navigate('/');
  }

  return (
    <>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <header>
            <button onClick={logOutClick} className={styles.signOut}>sign out</button>
          </header>
          <div className={styles.wrapper}>
            <h3>Admin</h3>
          </div>
        </>
      )}
    </>
  );
}
