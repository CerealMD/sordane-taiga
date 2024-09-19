// src/components/NestedTable.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../css/pieChart.css';

interface Detail {
  modified_date: string;
  subject: string;
  numStories: number;
}

interface NestedTableProps {
  details: Detail;
}
const NestedProjectTable: React.FC<NestedTableProps> = ({ details }) => {
    console.log(details)
    let lastModified = details.modified_date;
  const navigate = useNavigate();
  function openEpicsPage(location: any) {
    navigate(`/story/${location}`)
  }
    return <a className='boxClickable' onClick={()=> {openEpicsPage(`${details.subject}`)}}><div className='outerbox'>
      <div>
        <span style={{fontWeight: 'bold'}}>Subject:</span> {details.subject}
        </div>
      <div>
      <span style={{fontWeight: 'bold'}}>Number of Stories:</span> {details.numStories}
        </div>
        <div>
        <span style={{fontWeight: 'bold'}}>Last Modified:</span> {lastModified}
        </div>
        <div className='fakeLink'>
        Click to Open User Story
        </div>
      </div>
    </a>
  
};

export default NestedProjectTable;


