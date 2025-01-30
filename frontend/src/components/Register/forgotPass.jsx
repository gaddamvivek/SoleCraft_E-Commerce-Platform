import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Forgot.css'; // Import the CSS file

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const navigate = useNavigate();
  const clickHandler = async (e) => {
    e.preventDefault();
    if ('' === email) {
      alert('Please enter your email');
      return;
    }
    try {
      if (password === confirmPassword) {
        const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/forgetpassword`, { email, password });
        if (result.status === 200) navigate('/login');
        else alert('An error occurred. Please try again.');
      } else {
        alert('Password Mismatch');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        alert('User Not Found');
      } else {
        console.error(err.response.data);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-title">Reset Password</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <span
            onClick={togglePasswordVisibility}
            className="password-toggle-icon"
          >
            {isPasswordVisible ? 'Hide' : 'Show'}
          </span>
        </div>
        <div className="form-group relative">
          <input
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
          <span
            onClick={toggleConfirmPasswordVisibility}
            className="password-toggle-icon"
          >
            {isConfirmPasswordVisible ? 'Hide' : 'Show'}
          </span>
        </div>
        <div className="form-group">
          <button
            className="submit-button"
            type="button"
            onClick={clickHandler}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
