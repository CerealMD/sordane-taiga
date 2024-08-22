// src/components/ExpandableTable.tsx
import React, { useEffect, useState } from 'react';
import NestedTable from './nestedTable';
import classNames from 'classnames';
import LogoutButton from './logoutbutton';
import RedirectButton from './redirect';
import NavBar from './navTools';
import { useNavigate } from 'react-router-dom';
import '../css/loginpage.css';



const ReloadScreenMobile: React.FC = () => {
    const activeUser = localStorage.getItem('activeUser');
    const logo = require('../outSideContent/sordane_publishing_logo_square.jpg')
    const navigate = useNavigate();
  
    useEffect(() => {
      // Fetch data from an API
      const fetchData = async () => {

      };
  
      fetchData();
    }, []);
  
    const handleLogin = async (e: React.FormEvent) => {
      if(localStorage.getItem('isManager') !== ''){
        navigate('/combobox');
      }
      else{
        let navTool = '/' + localStorage.getItem('username')
        navigate(navTool);
      }
      return
    };
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
      <div style={{width: '100%', height: '100%'}}>
        <div className='mainMobile'>
          <div className='SideTextMobile'>
          <div className='fakeH1'>Welcome</div>
          <div className='fakeH3'>Hi {activeUser}</div>
      <form onSubmit={handleLogin}>
                  <button style={{width: '80vw'}} className='button' type="submit"><span>Re-Enter</span></button>
      </form>
      <button style={{width: '80vw'}} className='button' onClick={handleLogout} ><span>Logout</span></button>
      </div>
      </div>
      </div>
    );
  };
export default ReloadScreenMobile;

