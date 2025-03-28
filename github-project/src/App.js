import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Profile from './pages/Profile';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ContactUs from './pages/contactUs';
import About from './pages/About';


function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;