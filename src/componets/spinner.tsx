import React from 'react';
import '../css/spinner.css'; // Import your CSS file for styling

const Spinner: React.FC = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;