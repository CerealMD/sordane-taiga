import React from 'react';

const RefreshButton: React.FC = () => {
  const handleRefresh = async () => {
    const axios = require('axios');
    let data = JSON.stringify({
      "refresh": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyMzc0ODYzOSwianRpIjoiOWQ0Mjg4NWYxMmZmNDU3ZWIwNDM0N2I2NDM1YTBmNGYiLCJ1c2VyX2lkIjo2ODIwNDd9.KXygJR9OowiM-fdLJGwPHrTw8JzE_JhtWjgh6ExM-1K2L2C2-7AY5YbJtoZfyq6ghD0OJmNaNX3s5RpyRMlUZlVRP3-J0ObxtMj6Fl3nm_gmZEEniNP4SXY3FocwXtehDe4HZhC6RWPYNc-zNAJWnJWNOPzpCCspw9bVVVFQm1LJmjegt0SQCxC0xXbQs_aL1Vm6-UzR4mHdIhcufwQyA6nKuN5HPlNt4doyXFFBDpkrvnpJHFZ12BvqriDnkt_mNzmcCMdG2YY3dnk8AftXz6DuA2OwwxCxAGHFA7EO4ZycJLuCHEm0niV16liN9aIjKqP2_gJ9FO3XcQL1APuPhw"
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.taiga.io/api/v1/auth/refresh',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
   
   await axios.request(config)
    .then((response: { data: any; }) => {
      // console.log(JSON.stringify(response.data));
      localStorage.setItem('taiga-token', response.data.auth_token);
      localStorage.setItem('refresh-token', response.data.refresh);
      return
    })
    .catch((error: any) => {
      console.log(error);
      return
    });
  };

  return (
    <button onClick={handleRefresh}>
      Refresh Token
    </button>
  );
};

export default RefreshButton;
