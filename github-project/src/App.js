import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Home'; // Import Home.js

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* No PrivateRoute for home page, make it accessible without login */}
          <Route path="/" element={<Home />} />

          {/* Protect the profile route with PrivateRoute */}
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;