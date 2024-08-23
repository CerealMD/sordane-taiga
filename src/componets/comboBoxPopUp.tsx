import React, { useEffect, useState } from 'react';
import '../css/refreshpopup.css';
import { useSpinner } from './spinnerContext';
import Dropdown from './dropdown';
import axios, * as others from 'axios';
import { useNavigate } from 'react-router-dom';

interface ComboBoxPopUpProps {
    data: any; // Define a more specific type if possible
    onMessage: () => void;
    onClose: () => void;
  }
  
  const ComboBoxPopUp: React.FC<ComboBoxPopUpProps> = ({ data, onMessage, onClose }) => {
    const { showSpinner, hideSpinner } = useSpinner();
    const [response, setResponse] = useState<object | null>(null);
    const [error, setError] = useState<string | null>(null);

      const handleSelect = (value: string) => {
        console.log('Selected:', value);
      };
    return (
    <div className="overlay">
      <div className="popup">
        <h2>{data?.subject}</h2>
        <div>
          {/* <div >Status: <Dropdown items={data} onSelect={handleSelect} /></div> */}
          <div >Status: {data?.namez}</div>
          <div >Assigned to Full Name: {data?.assigned_to_extra_info?.full_name_display}</div>
          <div >Assigned to User Name: {data?.assigned_to_extra_info?.username}</div>
          <div >Project: {data?.milestone_slug}</div>
          <div >Due Date: {data?.due_date}</div>
          <div >Story Task: {data?.storysubject}</div>
          <div ><a target="_blank" href={data?.url}>{data?.url}</a></div>
          
    </div>
<div style={{marginTop: '10%'}}>
        <button onClick={onMessage}>Message</button>
        <button style={{float: 'right', marginRight: '1%'}} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};



export default ComboBoxPopUp;