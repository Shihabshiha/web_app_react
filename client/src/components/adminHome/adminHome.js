import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersAsync, deleteUserAsync } from '../../features/users/usersSlice';
import './adminHome.css';

const AdminHome = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users.result);
  console.log(users)
  
  const handleGetUserList = () => {
    dispatch(getUsersAsync());
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUserAsync(userId));
  }

  return (
    <div className="admin-home">
      <div className="admin-card">
        <h2 className="admin-welcome">Welcome, Admin!</h2>
        <button className="get-users-btn" onClick={handleGetUserList}>
          Get User List
        </button>
      </div>
      {users && users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminHome;
