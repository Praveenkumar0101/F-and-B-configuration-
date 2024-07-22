import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import SignupForm from './SignupForm';
import UserDetails from './UserDetails';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/UserDetails" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
