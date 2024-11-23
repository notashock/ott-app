import React from 'react'

const Login = () => {
  return (
    <div className="App">
        <main>
            <div className="box">
                <div className="nav">
                    <div className="login"></div>
                    <div className="signup"></div>
                </div>
                <div className="input">
                  <div className="email">
                    <input type="email" name="email" id="email" placeholder="Email Address..." />
                    <input type="password" name="pass" id="pass" placeholder="Password..." />
                  </div>
                </div>
                <div className="submit-btn">Submit</div>
            </div>
        </main>
      
    </div>
  )
}

export default Login
