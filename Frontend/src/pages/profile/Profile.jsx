import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/user/userSlice';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: ''
  });
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobile: user.mobile || '',
        email: user.email || ''
      });
    }
  }, [user]);

  if (isLoading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="profile-container">
      <button className='btn-position' onClick={logoutHandler}>Log out</button>
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-details">
        <div className="profile-item">
          <strong>First Name:</strong> <p>{formData.firstName}</p>
        </div>
        <div className="profile-item">
          <strong>Last Name:</strong> <p>{formData.lastName}</p>
        </div>
        <div className="profile-item">
          <strong>Mobile:</strong> <p>{formData.mobile}</p>
        </div>
        <div className="profile-item">
          <strong>Email:</strong> <p>{formData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
