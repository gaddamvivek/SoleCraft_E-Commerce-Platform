import React, { useEffect, useState } from 'react';
import './loginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [mailError, setMailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setMailError('');
    setPasswordError('');

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
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    try {
      const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, { email, password });
      if (result.data.accessToken) {
        // Save token and user info in localStorage
        window.localStorage.setItem('IsLoggedIn', true);
        localStorage.setItem('logindata', JSON.stringify(result.data.accessToken));
        localStorage.setItem('user', result.data.userName);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', result.data.userId);
        localStorage.setItem('fname', result.data.fname);
        localStorage.setItem('lname', result.data.lname);
        // console.log(result.data.userId);  

        navigate('/');
        window.location.reload();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMailError(err.response.data);
      } else {
        setMailError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const toggleToSignup = () => {
    setEmail('');
    setPassword('');
    setMailError('');
    setPasswordError('');
    navigate('/register');
  };

  const forgetPasswordHandler = () => {
    navigate('/forgotPass');
  };

  
  useEffect(() => {
    const token = localStorage.getItem('logindata');
    if (token) {
      navigate('/');
    }
  }, [navigate]);
  

  return (
    <div className="container font-rubik">
      <div className="header">Login</div>
      <form onSubmit={onSubmitHandler}>
        <div className="inputContainer">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="errorLabel">{mailError}</label>
        </div>
        <div className="inputContainer">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
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
        <div className="submitContainer">
          <button className="submit" type="submit">
            Login
          </button>
        </div>
        <div className="forget-password">
          Forgot password? <span onClick={forgetPasswordHandler}>Click Here!</span>
        </div>

        <p className="Registerhere">
          Don't have an account?{' '}
          <span className="register-link" onClick={toggleToSignup}>
            Register Here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
