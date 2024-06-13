import "./Login.css"

function Login() {
  return (
    <div className="app">
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="login-form-container">
        <div className="login-form">
          <h2>Welcome back</h2>
          <div className="divider">sign in with your Account</div>
          <input type="email" placeholder="name@email.com" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
          <button className="sign-in-button">Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Login