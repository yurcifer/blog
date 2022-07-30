import { useLayoutEffect, useState } from 'react';
import checkAuth from './API/checkAuth';
import logOut from './API/logOut';
import './App.css';
import Admin from './pages/Admin';

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
      {isLoading ? <h1>Loading</h1> : !isAuth ? <h3>logged out</h3> : <h3>Article but logged in</h3>}
    </div>
  );
}

export default App;
