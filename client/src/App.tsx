import { Login } from './components/login';
import { Home } from './components/home';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  function login(username: string) {
    setUsername(username);
  }

  return <>{username ? <Home username={username} /> : <Login login={login} />}</>;
}

export default App;
