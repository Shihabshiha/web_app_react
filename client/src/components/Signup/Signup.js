import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUserAsync } from '../../features/auth/authSlice';
import './Signup.css'

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signupUserAsync({
        name,
        email,
        password,
        phoneNumber
      }));

      console.log('Signup request successful!');
      navigate('/'); 
    } catch (error) {
      console.error('Signup request failed:', error);
    }
  };

  return (
    <div className="centered-container">
      <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </div>
    
  );
}

export default Signup;
