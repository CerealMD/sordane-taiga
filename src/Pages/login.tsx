import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    let data = JSON.stringify({
        "password": password,
        "type": "normal",
        "username": username
      });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.taiga.io/api/v1/auth',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    e.preventDefault();
    axios.request(config)
        .then((response) => {
        // console.log('27',response.data);
        localStorage.setItem('taiga-token', response.data.auth_token);
        navigate('/dashboard');
        return response.data.token;
        })
        .catch((error) => {
        // console.log(error);
        setError('Login failed. Please check your credentials.');
        return ;
        });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
