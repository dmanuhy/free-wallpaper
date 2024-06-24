import "./Login.css"

import { useContext, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userService } from "../../services/UserService";
function Login() {

  const { loginContext, logoutContext } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Please enter username and password");
    } else {
      const response = await userService.signInService({
        email: email,
        password: password
      })
      if (response.status === 200) {
        loginContext(response.data)
        navigate("/");
      } else {
        toast.error(response.message);
      }
    }
  }

  const handleEnterLogin = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  }

  return (
    <div className="app">
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="login-form-container">
        <form onKeyDown={(event) => handleEnterLogin(event)} className="login-form">
          <h2>Welcome back</h2>
          <div className="divider">sign in with your Account</div>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@email.com" className="input-field" />
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="input-field" />
          <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
          <button onClick={(event) => { handleLogin(event) }} className="sign-in-button" >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login