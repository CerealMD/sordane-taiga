import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Block of text to logout
    localStorage.removeItem('taiga-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('activeUser');
    localStorage.removeItem('isManager');
    localStorage.removeItem('id');
    localStorage.removeItem('bio');
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
