import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/darkmode.css';
import { useSpinner } from './spinnerContext';

const DarkModeButton: React.FC = () => {
    const { showSpinner, hideSpinner } = useSpinner();
  const handleDarkMode = () => {
    showSpinner();
    let value = localStorage.getItem('darkMode');
    if(value == 'false'){
        localStorage.setItem('darkMode', 'true')
    } else{
        localStorage.setItem('darkMode', 'false')
    }
    window.location.reload();
    hideSpinner();
  };
  const colorButton = () => {
    let isDarkMode = localStorage.getItem('darkMode');
    if(isDarkMode == 'true'){
        return 'darkModeButtonOn'
    } else{
        return "darkModeButtonOff"
    }
    
  };
  return (
    <button className={colorButton()} onClick={handleDarkMode}>
      Dark Mode
    </button>
  );
};

export default DarkModeButton;
