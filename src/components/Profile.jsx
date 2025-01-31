import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import HeaderIn from './HeaderIn';

const Profile = () => {
  const navigate = useNavigate();

  const [userData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+91 9876543210',
    fundsDonated: 5000,
    fundraisersCreated: 3
  });

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <>
      <HeaderIn />
      <div className="content">
        <h1>Profile</h1>
        <div className="profile-info">
          <div className="profile-pic">
            {/* Your profile pic logic here */}
          </div>
          <div className="details">
            <div className="field">
              <label>Name:</label>
              <span>{userData.name}</span>
            </div>
            <div className="field">
              <label>Email:</label>
              <span>{userData.email}</span>
            </div>
            <div className="field">
              <label>Phone No.:</label>
              <span>{userData.phone}</span>
            </div>
            <div className="field">
              <label>Funds Donated:</label>
              <span>{userData.fundsDonated} INR</span>
            </div>
            <div className="field">
              <label>Number of Fundraisers created:</label>
              <span>{userData.fundraisersCreated}</span>
            </div>
          </div>
        </div>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Profile;
