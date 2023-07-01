import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../features/auth/authSlice';
import './Home.css';

function HomeMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Access the user object from the Redux state
  const user = useSelector((state) => state.auth.user);
  const handleProfilePage = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <div className="home-container">
      <h2 className="welcome-note">Welcome {user && user.name}</h2>
      <p>This is the home page of the Sample Web App. Enjoy exploring!</p>
      <div className="button-container">
        <button className="profile-button" onClick={handleProfilePage}>Profile Page</button>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
  
}

export default HomeMain;
