import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/darkmode.css';
import { useSpinner } from './spinnerContext';

const DarkModeButton: React.FC = () => {
    const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();

  const handleDarkMode = () => {
    showSpinner();
    let value = localStorage.getItem('darkModeActive');
    let darkValue = JSON.stringify('false')
    if(value === darkValue){
         localStorage.setItem('darkModeActive', JSON.stringify('true'))
    } else{
        localStorage.setItem('darkModeActive', JSON.stringify('false'))
    }
    console.log(value)
    navigate('/');
    hideSpinner();
  };
  const colorButton = () => {
    let isDarkMode = localStorage.getItem('darkModeActive');
    let darkValue = JSON.stringify('false')
    if(isDarkMode === darkValue){
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
