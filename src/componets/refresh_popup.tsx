import React from 'react';
import '../css/refreshpopup.css';

interface ErrorPopupProps {
  message: string;
  onYes: () => void;
  onNo: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onYes, onNo }) => {
  // console.log('do you see me?')
    return (
    <div className="overlay">
      <div className="popup">
        <h2>Error</h2>
        <p>{message}</p><br/><p>Your Token has expired would you like to refresh it?</p>
        <button onClick={onYes}>Yes</button>
        <button onClick={onNo}>No</button>
      </div>
    </div>
  );
};



export default ErrorPopup;