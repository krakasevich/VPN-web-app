import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styles/Global.css'
import HomePage from "./Homepage";

function App() {
  return (
    <div>
      <h2 className='caption'>SecureNet</h2>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;