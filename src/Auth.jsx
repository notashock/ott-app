import React, { useState } from 'react';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login');
      const users = await response.json();
      const user = users.find(user => user.username === username && user.password === password);

      if (user) {
        onLoginSuccess(username, isLogin);
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
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
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="Remember">
              <input type="checkbox" name="remember" id="remember" />
              <p>Remember me</p>
            </div>
            <div className="forget">
              Forgot your Password? <a href="#">Click here</a>
            </div>
            <button onClick={handleLogin}>{isLogin ? "Login" : "Signup"}</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;