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
        <div className='fakeH1'>Error</div>
        <div className='fakeH3'>Your Token has expired would you like to refresh it?</div>
        <div>
        <button onClick={onYes}>Refresh</button>
        <button style={{float: 'right'}} onClick={onNo}>Logout</button>
        </div>
      </div>
    </div>
  );
};



export default ErrorPopup;