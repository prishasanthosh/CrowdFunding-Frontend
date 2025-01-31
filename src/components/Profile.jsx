import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import HeaderIn from './HeaderIn';

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); // Initialize userData as null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors if any

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken');
      console.log('Token:', token); // Debugging token value
      
      if (!token) {
        navigate('/profile'); // Redirect to home if no token found
        return;
      }

      try {
        const response = await axios.get('https://crowdfunding-hoo1.onrender.com/user-profile', {
          headers: {
            Authorization: `Bearer ${token}` // Include token in request headers
          }
        });
        console.log('User Data:', response.data); // Debugging user data response
        setUserData(response.data); // Set the fetched user data
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/'); // Redirect to home after logout
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  return (
    <>
      <HeaderIn />
      <div className="content">
        <h1>Profile</h1>
        <div className="profile-info">
          <div className="profile-pic">
            {/* Profile pic logic */}
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
