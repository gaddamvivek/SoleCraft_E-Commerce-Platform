import React, { useState, useEffect } from 'react';
import './NavBar.css';
import logo from '../Assets/logo.jpg'; 
import homeIcon from '../Assets/home-icon.jpg'; 
import wishlistIcon from '../Assets/wishlist.jpg'; 
import cartIcon from '../Assets/cart_icon.jpg';
import loginIcon from '../Assets/login.jpg'; 
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState(''); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on initial load
  useEffect(() => {
    const isLoggedInStatus = localStorage.getItem('IsLoggedIn')=== 'true';
    setIsLoggedIn(isLoggedInStatus);
    const user =  localStorage.getItem('user');
    const email = localStorage.getItem('email');
    setUserName(user);
    setEmail(email);
    // console.log(email);

  }, []);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName('');
    setEmail('');
    navigate('/'); // Redirect to home page after logout
    alert("You are Logged Out. Please Login to Shop")
  };

  // Handle navigation based on login status
  const VeriNav = (route) => {
    if (isLoggedIn) {
      navigate(route);
    } else {
      alert("Login to Shop")
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="NvBrLogo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="title">
        <h1>SOLE CRAFT</h1>
      </div>
      <div className="navbar-buttons">
        <div className="navbar-button" onClick={() => VeriNav('/')}>
          <img src={homeIcon} alt="Home" />
        </div>
        <div className="navbar-button" onClick={() => VeriNav('/wishlist')}>
          <img src={wishlistIcon} alt="Wishlist" />
        </div>
        <div className="navbar-button" onClick={() => VeriNav('/cart')}>
          <img src={cartIcon} alt="Cart" />
        </div>

        {isLoggedIn ? (
          <div className="navbar-button dropdown">
            <img src={loginIcon} alt="User" className="dropdown-toggle" />
            <div className="dropdown-content">
              <div>{userName || 'User'}</div>
              <div>{email}</div>
              <button onClick={() => navigate('/profile')}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className="navbar-button" onClick={() => navigate('/login')}>
            <img src={loginIcon} alt="Login" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
