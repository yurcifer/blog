import { useLayoutEffect, useState } from 'react';
import checkAuth from './API/checkAuth';
import logOut from './API/logOut';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setIsLoading(true);
    checkAuth().then(result => {
      setIsAuth(result);
      setIsLoading(false);
    });
  }, []);

  function logOutClick() {
    logOut();
    setIsAuth(false);
  }
  return (
    <div className="App">
      <header>{isAuth ? <button onClick={logOutClick}>sign out</button> : ''}</header>
      {isLoading ? <h1>Loading</h1> : isAuth ? <h1>admin</h1> : <h1>blog</h1>}
    </div>
  );
}

export default App;
