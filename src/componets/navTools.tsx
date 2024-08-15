import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './logoutbutton'; 
import DarkModeButton from './darkModeButton'; 
import '../css/darkmode.css';

const NavBar: React.FC = () => {
  const isPageDarkMode = () => {
    let isDarkMode = localStorage.getItem('darkModeActive');
    let isDarkMode2 = JSON.stringify("true");
      if(isDarkMode == isDarkMode2){
          return 'darkModePageOff'
      } else{
          return "darkModePageOn"
      }
  }
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', backgroundColor: '#f8f8f8' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
        <div style={{width: '78%', marginLeft: '10%', display: 'block ruby'}}>
        <li>
          <Link to="/combobox" style={{ textDecoration: 'none', color: '#333' }}>Combobox</Link>
        </li>
        <li style={{marginLeft: '10px'}}>
          <Link to="/tasks" style={{ textDecoration: 'none', color: '#333' }}>Tasks</Link>
        </li>
        </div>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
