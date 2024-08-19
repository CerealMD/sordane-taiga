import React from 'react';
import '../css/refreshpopup.css';

interface DrillDownPopUpProps {
  data: any;
  onMessage: () => void;
  onClose: () => void;
}

const DrillDownPopUp: React.FC<DrillDownPopUpProps> = ({ data, onMessage, onClose }) => {
  // console.log(data)
    return (
    <div className="overlay">
      <div className="popup">
        <h2>{data?.subject}</h2>
        <div>
          <div >Column: {data?.namez}</div>
          <div >Assigned to Full Name: {data?.assigned_to_extra_info?.full_name_display}</div>
          <div >Assigned to User Name: {data?.assigned_to_extra_info?.username}</div>
          <div >Project: {data?.milestone_slug}</div>
          <div >Due Date: {data?.due_date}</div>
          <div >Story Task: {data?.storysubject}</div>
          <div ><a href={data?.url}>{data?.url}</a></div>
          
    </div>
<div style={{marginTop: '10%'}}>
        <button onClick={onMessage}>Message</button>
        <button style={{float: 'right', marginRight: '1%'}} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};



export default DrillDownPopUp;