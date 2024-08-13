import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../componets/logoutbutton';
import RedirectButton from '../componets/redirect';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('taiga-token');
  const activeUser = localStorage.getItem('activeUser');
  console.log(token)
  console.log(activeUser)
  let loginOptions;
  if(!token || !activeUser){
    loginOptions = <>
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit">Login</button></>;    
  } 
  else 
  {      
   loginOptions = <>
    <div>
      <label> Welcome {activeUser} </label>
      <RedirectButton />
      <LogoutButton />
    </div>
  </>;
  }
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
        console.log('27',response.data);
        let activeUser = "" + response.data.full_name + " AKA " + response.data.username
        localStorage.setItem('taiga-token', response.data.auth_token);
        localStorage.setItem('activeUser', activeUser);
        localStorage.setItem('refresh-token', response.data.refresh);
        navigate('/dashboard');
        return response.data.token;
        })
        .catch((error) => {
        console.log(JSON.parse(JSON.stringify(error)));
        if(error.message){
          setError(error.message);
        }
        else{
          setError('Login failed. Please check your credentials.');
        }
        return ;
        });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
      {loginOptions}
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;


