import React, { useState } from 'react';
import '../Login/loginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [fname, setFname] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [lname, setLname] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [email, setEmail] = useState('');
  const [mailError, setMailError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(prev => !prev);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMailError('');
    setPasswordError('');
    setLnameError('');
    setFnameError('');

    if (!fname) {
      setFnameError('Please enter your first name');
      return;
    }
    if (!lname) {
      setLnameError('Please enter your last name');
      return;
    }
    if (!username) {
      setUsernameError('Please enter a username');
      return;
    }
    if (!email) {
      setMailError('Please enter your email');
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setMailError('Please enter a valid email');
      return;
    }
    if (!password) {
      setPasswordError('Please enter a password');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        fname, lname, username, email, password
      });
      if (result) {
        alert('Registration Successful');
        navigate('/');
        setFname('');
        setLname('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.error(err.response.data);
        setMailError(err.response.data);
      } else {
        console.error(err);
        setMailError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Register</h2>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="nameContainer">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <label className="errorLabel">{fnameError}</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <label className="errorLabel">{lnameError}</label>
        </div>
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="errorLabel">{usernameError}</label>
        </div>
        <div className="inputContainer">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="errorLabel">{mailError}</label>
        </div>
        <div className="inputContainer">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
          <label className="errorLabel">{passwordError}</label>
        </div>
        <div className="inputContainer">
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="button" onClick={toggleConfirmPasswordVisibility} className="password-toggle">
            {isConfirmPasswordVisible ? 'Hide' : 'Show'}
          </button>
          <label className="errorLabel">{passwordError}</label>
        </div>
        <div className="loginsignupbtns">
          <button className="submit" type="submit">Register</button>
          <button className="submit" type="button" onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;