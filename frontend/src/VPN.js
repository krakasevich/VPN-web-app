import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./styles/VPN.css"

function VPN() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(userData));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    if (!user) {
        return null;
    }

    return (
        <div className="vpn_page">
            <div className="vpn_header">
                <h1>Welcome, {user.username}!</h1>
                <button onClick={handleLogout} className="logout_button">Logout</button>
            </div>
            
            <div className="vpn_content">
                <h2>VPN Dashboard</h2>
                <div className="vpn_status">
                    <p>Status: Disconnected</p>
                    <button className="connect_button">Connect VPN</button>
                </div>
                
                <div className="vpn_info">
                    <h3>Your VPN Information</h3>
                    <p>IP Address: Not connected</p>
                    <p>Location: Not connected</p>
                    <p>Server: Not selected</p>
                </div>
            </div>
        </div>
    )
}

export default VPN;