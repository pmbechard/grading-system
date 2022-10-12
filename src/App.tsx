import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState<string>('');

  const logIn = async (): Promise<void> => {
    // FIXME: Add log in functionality
    setTimeout(() => setUser('Sample User'), 500);
  };
  const logOut = async (): Promise<void> => {
    // FIXME: Add log out functionality
    setTimeout(() => setUser(''), 500);
  };

  return (
    <>
      <Header />
      {user ? (
        <>
          <div>Hi, {user}</div>
          <button onClick={logOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={logIn}>Sign In</button>
      )}
      
    </>
  );
}

export default App;
