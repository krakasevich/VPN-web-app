import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Login.css'

function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate('/registration');
    };

    const validateForm = () => {
        if (!username || username.length < 3) {
            setMessage("Username must be at least 3 characters long");
            return false;
        }
        
        if (!password || password.length < 6) {
            setMessage("Password must be at least 6 characters long");
            return false;
        }
        
        return true;
    }

    const handleLogin = () => {
        if (!validateForm()) return;
    };

    return (
        <div className="auth_block">
            <div>
                <h2>Welcome back!</h2>
                <p>Sign in to your account</p>
            </div>
            
            <div className="user_info"> 
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="auth_button">
                <button onClick={handleLogin}>Sign In</button>
                {message && <p>{message}</p>}
            </div>
            
            <div className="auth_switch">
                <p>Don't have an account? <button onClick={handleRegisterRedirect}>Register</button></p>
            </div>
        </div>
    );
}


export default Login;