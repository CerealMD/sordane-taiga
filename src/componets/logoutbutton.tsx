import React from 'react';
import { useNavigate } from 'react-router-dom';
import RunLogoutCode from './runLogoutCode';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
function logoutClicked (){
navigate('/logout')
}
  return (
    <button style={{ float: 'right'}} onClick={logoutClicked}>
      Logout
    </button>
  );
};

export default LogoutButton;
