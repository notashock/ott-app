import React, { useState } from 'react';

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch('/movie');
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
    <div className="pt-4 md:pt-2 min-h-screen flex flex-col items-center bg-mainBg text-text gap-10">
      <nav className="nav-bar">
        <h1 className="text-2xl font-bold">{isLogin ? "Login" : "Signup"}</h1>
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="px-4 py-2 bg-accent text-text rounded-lg hover:bg-ac_hover">
          {isLogin ? "Signup" : "Login"}
        </button>
      </nav>

      <main className="flex flex-col items-center gap-8 w-full max-w-md bg-primary p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-accent">CineVibe</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 bg-mainBg text-text rounded-md outline-none focus:ring-2 focus:ring-accent"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-mainBg text-text rounded-md outline-none focus:ring-2 focus:ring-accent"
        />

        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <p>Remember me</p>
        </div>

        <div className="text-sm text-gray-400">
          Forgot your password?{" "}
          <a href="#" className="text-accent hover:underline">Click here</a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-accent py-3 rounded-md hover:bg-ac_hover">
          {isLogin ? "Login" : "Signup"}
        </button>
      </main>
    </div>
  );
};

export default Auth;
