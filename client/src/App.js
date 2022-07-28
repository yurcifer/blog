import { useLayoutEffect, useState } from 'react';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/checkAuth', {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setIsAuth(json.auth);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="App">
      <header></header>
      {isLoading ? <h1>Loading</h1> : isAuth ? <h1>admin</h1> : <h1>blog</h1>}
    </div>
  );
}

export default App;
