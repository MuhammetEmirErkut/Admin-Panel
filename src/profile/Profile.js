import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Sidebar from '../components/Layout/Sidebar';
import EditProfile from './EditProfile';
import { UserProvider } from '../context/context.js';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const ProfileContent = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <EditProfile user={currentUser} />
  );
};

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <UserProvider>
      <Box sx={{ display: "flex", backgroundColor: '#fafafa' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px", backgroundColor: '#fafafa' }}>
          <ProfileContent />
          <Button
            className='rounded-2 ml-3 m-2 p-2'
            variant='contained'
            color='warning'
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </UserProvider>
  );
};

export default Profile;
