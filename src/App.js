import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import SignupForm from './SignupForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/SignupForm" element={<SignupForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
