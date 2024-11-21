import React, { useState } from 'react'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="Auth">
      <nav>
        <div className="head">{isLogin ? "Login" : "SignUp"}</div>
      </nav>
      
    </div>
  )
}

export default Auth
