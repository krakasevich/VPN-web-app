import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styles/Global.css'
import HomePage from "./Homepage";
import RegisterPage from "./Registration";
import Login from "./Login";
import VPN from "./VPN";

function App() {
  return (
    <div>
      <h2 className='caption'>SecureNet</h2>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vpn" element={<VPN />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;