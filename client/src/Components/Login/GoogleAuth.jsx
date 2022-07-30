import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';
import { useStore } from 'react-redux';
import setToken from '../../API/setToken';

export default function GoogleAuth({ navigateIfAuth }) {
  const store = useStore();
  const auth = store.getState().firebase.auth;
  const provider = new GoogleAuthProvider();

  function signIn() {
    signInWithPopup(auth, provider)
      .then(async result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = await result.user.getIdToken();
        // The signed-in user info.
        await setToken(token);
        console.log('resolved');
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        console.log(error);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log('rejected');
      })
      .finally(() => navigateIfAuth());
  }
  return <GoogleButton onClick={signIn} />;
}
