import "./Register.scss"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { userService } from "../../services/UserService";

const Register = () => {

    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            if (newUser.password !== newUser.confirmPassword) {
                toast.error("Confirm password didn't matched")
            } else {
                const response = await userService.signUpService(newUser);
                if (response.status === 201) {
                    toast.success(response.message);
                    navigate('/login');
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="register">
            <div className="login-form">
                <h2 className="text-white">New to wallpaper</h2>
                <div className="divider text-white">Register your Account</div>
                <input onChange={(event) => setNewUser({ ...newUser, name: event.target.value })} value={newUser.name} type="text" placeholder="username" className="input-field" />
                <input onChange={(event) => setNewUser({ ...newUser, email: event.target.value })} value={newUser.email} type="email" placeholder="Password" className="input-field" />
                <input onChange={(event) => setNewUser({ ...newUser, password: event.target.value })} value={newUser.password} type="password" placeholder="username" className="input-field" />
                <input onChange={(event) => setNewUser({ ...newUser, confirmPassword: event.target.value })} value={newUser.confirmPassword} type="password" placeholder="Password" className="input-field" />
                <Link to="/login" className="forgot-password fs-6 text-white">Already have an account? Login here</Link>
                <button onClick={(event) => handleRegister(event)} className="sign-in-button">Register</button>
            </div>
        </div>
    )
}

export default Register