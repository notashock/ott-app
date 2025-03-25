import React, { useState } from 'react';
// import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import App from '../pages/App';
import Auth from '../pages/Auth';

const Home = () => {
    const [name, setName] = useState("Viber");
    const [isLogin, setLogin] = useState(true);
    const handleAuthSuccess = (username, isLogin) =>{
        setName(username);
        setLogin(isLogin);
    }
    
  return (
    <div>
      {isLogin ? <App name= {name}/> : <Auth onLoginSuccess={handleAuthSuccess}/>}
    </div>
  )
}

export default Home
