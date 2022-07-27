import React, { useEffect } from 'react';
import styles from './Login.module.css';

export default function Login() {
  useEffect(() => {
    console.log(styles)
  })
  return <h1 className={styles.title}>Login</h1>;
}
