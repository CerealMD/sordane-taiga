import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './logout'; // Adjust the path if necessary

const NavBar: React.FC = () => {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', backgroundColor: '#f8f8f8' }}>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
        <li>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
        </li>
        <li>
          <Link to="/users" style={{ textDecoration: 'none', color: '#333' }}>Users</Link>
        </li>
        <li>
          <Link to="/combobox" style={{ textDecoration: 'none', color: '#333' }}>Combobox</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
