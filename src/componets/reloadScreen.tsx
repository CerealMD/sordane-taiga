// src/components/ExpandableTable.tsx
import React, { useEffect, useState } from 'react';
import NestedTable from './nestedTable';
import classNames from 'classnames';
import LogoutButton from './logoutbutton';
import RedirectButton from './redirect';
import NavBar from './navTools';
import { useNavigate } from 'react-router-dom';
import '../css/loginpage.css';



const ReloadScreen: React.FC = () => {
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
      navigate('/combobox');
      return
    };
  
    return (
      <div style={{width: '100%', height: '100%'}}>
        <div className='leftMain'> 
          <div className='SideText'>
          Sordane Publishing
          <div><img alt="edit icon" src={String(logo)}></img></div>
          Feel The Mini Taste The Mini
        </div>
        </div>
        <div className='rightMain'>
          <div className='SideText'>
          <h1>Welcome</h1>
          <h3>Hi {activeUser}</h3>
      <form onSubmit={handleLogin}>
                  <button className='button' type="submit"><span>Re-Enter</span></button>
      </form>
      </div>
      </div>
      </div>
    );
  };
export default ReloadScreen;

