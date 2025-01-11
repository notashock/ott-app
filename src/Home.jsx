import React, { useState } from 'react';
import App from '../src/App';
import Auth from '../src/Auth';

const Home = () => {
    const [name, setName] = useState("Savy");
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
