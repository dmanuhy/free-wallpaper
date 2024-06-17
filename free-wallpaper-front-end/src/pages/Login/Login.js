import "./Login.css"

import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom";

function Login() {

  const { login, user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="login-form-container">
        <div className="login-form">
          <h2>Welcome back</h2>
          <div className="divider">sign in with your Account</div>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@email.com" className="input-field" />
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="input-field" />
          <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
          <button onClick={() => {
            login(email, password)
            navigate('/')
          }} className="sign-in-button" >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login