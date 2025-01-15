import React, { useState } from 'react';
import App from '../components/App';
import Auth from '../components/Auth';

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
