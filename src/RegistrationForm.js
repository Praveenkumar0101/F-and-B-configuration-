import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log('Response:', response.data);

      if (formData.email.endsWith('@gmail.com')) {
        alert('User registration successful.');
      } else if (formData.email.endsWith('@Numetry.in') || formData.email.endsWith('@Numetry.com')) {
        alert('Admin registration successful.');
      } else {
        alert('Invalid email domain.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error registering. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <h3>Register Form</h3>
        <div>
          <label>Full Name:</label><br />
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile Number:</label><br />
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Username:</label><br />
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email ID:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Register</button>
        <p>
          If you have an account? <Link to="/SignupForm">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;
