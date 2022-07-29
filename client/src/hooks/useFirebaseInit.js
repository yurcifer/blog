import { initializeApp } from '@firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
} from '@firebase/auth';
import { useDispatch, useStore } from 'react-redux';
import { useActions } from './useActions';

const firebaseConfig = {
  apiKey: 'AIzaSyD8OiwHmRSQWjpW4JZtBkV33zgPXulVJVk',
  authDomain: 'blog-390d7.firebaseapp.com',
  projectId: 'blog-390d7',
  storageBucket: 'blog-390d7.appspot.com',
  messagingSenderId: '623218025572',
  appId: '1:623218025572:web:5511ace08267f77e2b2b71',
};

export default function useFirebaseInit() {
  const store = useStore();
  const { init } = useActions();
  if (store.getState().firebase.app) {
    return;
  }
  console.log('useFirebaseInit');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  setPersistence(auth, browserSessionPersistence);
  init({ app, auth });
}
