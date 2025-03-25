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

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:8000/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful");
                localStorage.setItem('user', JSON.stringify({username}));
                setTimeout(() => {
                    navigate("/vpn");
                }, 1000);
            } else {
                setMessage(data.detail || "User not found. Please register first!");
            }
        } catch (error) {
            setMessage("Error connecting to server");
            console.error('Error:', error);
        }
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