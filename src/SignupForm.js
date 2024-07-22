import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get navigate function from React Router

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('Response:', response.data);

      if (email.endsWith('@gmail.com')) {
        alert('Welcome, user!');
        navigate('/UserDetails'); // Redirect to UserDetails component
      } else {
        alert('Invalid email domain for user login.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error logging in. Please try again.');
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="Signup-Form">
            <h3>Signup Form</h3>
            <div>
              <label htmlFor="email">Email:</label><br />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label><br />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="sign-btn">Sign Up</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default SignupForm;
