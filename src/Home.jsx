import React, { useState } from 'react';
import App from './App';
import Auth from '../src/unused_comp/Auth';

const Home = () => {
    const [isAuth, setAuth] = useState(true);
    const handleAuthSuccess = () =>{
        setAuth(true);
    }
  return (
    <div>
        {isAuth ? <App /> : <Auth onAuthSuccess={handleAuthSuccess()} />}
    </div>
  )
}

export default Home
