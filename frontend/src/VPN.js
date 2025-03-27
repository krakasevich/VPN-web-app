import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./styles/VPN.css"

function VPN() {
    const [user, setUser] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('Sweden');
    const [isConnected, setIsConnected] = useState(false);
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
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        if (isConnected) {
            setIsConnected(false);
        }
    };

    const handleConnect = () => {
        setIsConnected(!isConnected);
    };

    const getLocationName = (location) => {
        switch(location) {
            case 'sweden':
                return 'Sweden';
            case 'uk':
                return 'United Kingdom';
            default:
                return 'Not selected';
        }
    };

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
                    <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
                    <div className="location_selector">
                        <label htmlFor="Location">Select Location</label>
                        <select 
                            id="location"
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            className="location_dropdown"
                        >
                            <option value="sweden">Sweden</option>
                            <option value="uk">United Kingdom</option>               
                        </select>
                    </div>
                    <button 
                        onClick={handleConnect}
                        className={`connect_button ${isConnected ? 'disconnect' : ''}`}
                    >
                        {isConnected ? 'Disconnect VPN' : 'Connect VPN'}
                    </button>
                </div>
                
                <div className="vpn_info">
                    <h3>Your VPN Information</h3>
                    <p>IP Address: {isConnected ? 'Connected' : 'Not connected'}</p>
                    <p>Location: {getLocationName(selectedLocation)}</p>
                    <p>Server: {isConnected ? `${getLocationName(selectedLocation)} Server` : 'Not selected'}</p>
                </div>
            </div>
        </div>
    )
}

export default VPN;