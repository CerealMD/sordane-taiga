import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectButton: React.FC = () => {
  const navigate = useNavigate();

  const handleredirect = () => {
    navigate('/dashboard');
  };

  return (
    <button onClick={handleredirect}>
      To Dashboard
    </button>
  );
};

export default RedirectButton;