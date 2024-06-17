import "./Register.css"

function Register() {
  return (
    <div className="app">
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="login-form-container">
        <div className="login-form">
          <h2>New to wallpaper</h2>
          <div className="divider">Register your Account</div>
          <input type="text" placeholder="name" className="input-field"/>
          <input type="password" placeholder="Password" className="input-field" />
          <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
          <button className="sign-in-button">Register</button>
        </div>
      </div>
    </div>
  )
}

export default Register