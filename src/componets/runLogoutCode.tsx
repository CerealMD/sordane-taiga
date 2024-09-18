
  import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
  
  const RunLogoutCode: React.FC = () => {
    const navigate = useNavigate();


  
    useEffect(() => {
      const handleLogout = () => {
      localStorage.removeItem('taiga-token');
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('activeUser');
      localStorage.removeItem('isManager');
      localStorage.removeItem('username');
      localStorage.removeItem('id');
      localStorage.removeItem('bio');
      sessionStorage.clear();
      navigate('/');
      window.location.reload();
      };
  
      handleLogout();
    }, []);
  
    return <div>Logging out...</div>;
  };
  
  export default RunLogoutCode;