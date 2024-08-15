import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('taiga-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('activeUser');
    sessionStorage.clear();
    // Redirect to login page
    navigate('/');
    window.location.reload();
  };

  return (
    <button style={{ float: 'right'}} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
