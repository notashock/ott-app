import React, { useState } from 'react'
import axios from 'axios';

const Auth = ({onLoginSuccess}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (username, password) => {
    try{
      const response = await axios.get(`http://localhost:3000/login`);
      const users = await response.data;
      const user = users.find(user => user.username === username && user.password === password);
      if(user){
        onLoginSuccess(username, isLogin);
      }
      else{
        console.log("Login Failed");
      }
    }
    catch(error){
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="Auth">
      <nav>
        <div className="title">
          <h1>{isLogin ? "Login" : "Signup"}</h1>
          <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Signup" : "Login"}</button>
        </div>
      </nav>
      <main>
        <div className="login">
          <div className="title">
            <h1>StreamSavy</h1>
          </div>
          <div className="form">
            <input type="text" name="username" id="username" value={username} onChange={(e)=> setUsername(e.target.value)}placeholder="Username" />
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder="Password" />
            <div className="Remember"><input type="checkbox" name="remember" id="remember" /><p>Remember me</p></div>
            <div className="forget">Forgot your Password? <a href="#">Click here</a></div>
            <button onClick={() => handleLogin(username, password)}>{isLogin ? "Login" : "Signup"}</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Auth
