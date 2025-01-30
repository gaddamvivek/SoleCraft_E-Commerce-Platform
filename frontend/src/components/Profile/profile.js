import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from localStorage
    const username = localStorage.getItem('user');
    const email = localStorage.getItem('email');
    const fname = localStorage.getItem('fname');
    const lname = localStorage.getItem('lname');

    if (username && email) {
      setUserData({
        fname,
        lname,
        username,
        email,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Ensure this is 'userId' corresponding to your database field
  
      if (!userId) {
        setError('User ID not found');
        return;
      }
  
      // Send PUT request with updated user data
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/auth/update/${userId}`, userData);
  
      if (response.data.success) {
        // Update localStorage with new user data
        localStorage.setItem('user', response.data.user.username); 
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('fname', response.data.user.fname);
        localStorage.setItem('lname', response.data.user.lname);
  
        // Update UI state
        setEditMode(false);
        setError('');
        setUserData(response.data.user);
      }
      navigate('/profile');
    } catch (error) {
      setError('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {error && <p className="error">{error}</p>}
      <div className="profile-field">
        <label>First Name:</label>
        <input
          type="text"
          name="fname"
          value={userData.fname}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <div className="profile-field">
        <label>Last Name:</label>
        <input
          type="text"
          name="lname"
          value={userData.lname}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <div className="profile-field">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      <div className="profile-field">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </div>
      {editMode ? (
        <button className='ProfBut' onClick={handleSave}>Save</button>
      ) : (
        <button className='ProfBut' onClick={() => setEditMode(true)}>Edit</button>
      )}
    </div>
  );
};

export default Profile;
