// src/components/ExpandableTable.tsx
import React, { useEffect, useState } from 'react';
import NestedTable from './nestedTable';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../componets/logoutbutton';
import RedirectButton from '../componets/redirect';
import ReloadScreen from '../componets/reloadScreen';
import '../css/loginpage.css';



const LoginContainerMobile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('taiga-token');
  const activeUser = localStorage.getItem('activeUser');
  const logo = require('../outSideContent/sordane_publishing_logo_square.jpg')
  
    useEffect(() => {
      // Fetch data from an API
      const fetchData = async () => {

      };
  
      fetchData();
    }, []);
  
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
      if(username==="" || username === null || username=== undefined || username==='Enter your Username'){
        setError('Please add your username');
        return
      } 
      else if (password==="" || password === null || password=== undefined || password==='Enter your Password'){
        setError('Please add your password');
        return
      }
      else{
        axios.request(config)
        .then((response) => {
        // console.log('27',response.data);
        let activeUser = "" + response.data.full_name + " AKA " + response.data.username
        localStorage.setItem('taiga-token', response.data.auth_token);
        localStorage.setItem('activeUser', activeUser);
        localStorage.setItem('refresh-token', response.data.refresh);
        navigate('/combobox');
        return response.data.token;
        })
        .catch((error) => {
        // console.log(JSON.parse(JSON.stringify(error)));
        if(error.message){
          setError(error.message);
        }
        else{
          setError('Login failed. Please check your credentials.');
        }
        return ;
        });
      }
    };
  
    return (
      <div style={{width: '100%', height: '100%'}}>
        <div className='mainMobile'>
          <div className='SideTextMobile'>
          <div className='fakeH1'>Welcome</div>
          <div className='fakeH3'>Please login with your Taiga Credentials</div>
      <form onSubmit={handleLogin}>
      <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    className='textBox'
                    style={{width: '80vw'}}
                    placeholder="Enter your Username"/>
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className='textBox'
                    style={{width: '80vw'}}
                    placeholder="Enter your Password"/>
                  </div>
                  <button style={{width: '80vw'}} className='button' type="submit"><span>Login</span></button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
      </div>
      </div>
    );
  };
export default LoginContainerMobile;

