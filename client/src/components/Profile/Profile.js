import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Profile.css'
import {getProfileImage, uploadProfileImage } from '../../api';

const Profile = () => {
  const user = useSelector((state) => state.auth.user.result.data);
  const [profileImage, setProfileImage] = useState(null);
  const accessToken = useSelector((state) => state.auth.user.result.accessToken);
  

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (!accessToken) return;
        console.log('userrrr',user)
        const response = await getProfileImage(user);
        const imageUrl = response.data.imageUrl;
        setProfileImage(imageUrl);
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await uploadProfileImage(formData,accessToken);
      const imageUrl = response.data.imageUrl;
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

 

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-placeholder">Add Profile Image</div>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="image-upload" />
      </div>
      <div className="profile-details">
        <h2>{user && user.name}</h2>
        <p>Email: {user && user.email}</p>
        <p>Phone Number: {user && user.phoneNumber}</p>
      </div>
    </div>
  );
};

export default Profile;



