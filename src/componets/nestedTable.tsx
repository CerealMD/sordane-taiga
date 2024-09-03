// src/components/NestedTable.tsx
import React, { useEffect, useState } from 'react';
import GetRowStyle from '../componets/getRowStyle';
import classNames from 'classnames';
import ComboBoxPopUp from './comboBoxPopUp';
import { useSpinner } from './spinnerContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

interface Detail {
    assigned_to_extra_info: [];
    username: string;
    url: string;
    subject: string;
    due_date: string;
    milestone_slug: string;
    status_extra_info: string;
    user_story_extra_info: string;
    namez: string;
    storysubject: string;
    id: number;
    ref: number;
}

interface NestedTableProps {
  details: Detail[];
}
const NestedTable: React.FC<NestedTableProps> = ({ details }) => {
  const navigate = useNavigate();

  const [openPopUpToken, setopenPopUpToken] = useState<object | null>(null);

  const editIcon = require('../outSideContent/edit-icon.png')
  const getRowStyle = (index: number) => {
    return index % 2 === 0 ? 'rowEven2' : 'rowOdd2';
  };

  const OpenPopUp = (item: Detail) => {
    // console.log(item)

    setopenPopUpToken(item);
    
  };
  const handleMessage = async () => {

    setopenPopUpToken(null);
  
  };
  
  const handleClose = () => {

    setopenPopUpToken(null);
  };
  function handleSliderChange(location: any) {
    navigate(`/${location}`)
  }
if(details.length > 0){
  // console.log(details)
details.forEach(item => {
  // console.log(item.id)
  })
  return (<div style={{ width: '96%', marginLeft: '2%', marginRight: '2%', paddingBottom: '10px' }}>
    <div>
      <div className='rowParentTH'>
      <div className='data subData' style={{width:'13%', textAlign: 'center'}}>Assigned To</div>
      <div className='data subData'>Task</div>
      <div className='data subData' style={{width:'10%', textAlign: 'center'}}>Project</div>
      <div className='data subData' style={{width:'10%', textAlign: 'center'}}>Column</div>
      <div className='data subData'>Epic</div>
      <div className='data subData' style={{width:'8%', textAlign: 'center'}}>Due Date</div>
      <div className='data subData' style={{width:'2%', textAlign: 'center'}}>Edit</div>
      </div>
    </div>
    <div>
    {details.map((item, index)  => { 
    return <div key={item.ref}>
      <div  className={classNames('rowParent', getRowStyle(index))}>
          <div className='data subData' style={{width:'13%', textAlign: 'center', cursor: 'pointer'}}><a onClick={()=> {handleSliderChange(`${item.username}`)}}>{item?.username}</a></div>
          <div className={classNames(GetRowStyle(item.due_date), 'canClick', 'subData')} ><a href={item?.url} target="_blank">{item?.subject}</a></div>
          <div className='data subData' style={{width:'10%', textAlign: 'center'}}>{item?.milestone_slug}</div>
          <div className='data subData' style={{width:'10%', textAlign: 'center'}}>{item?.namez}</div>
          <div className='data subData'>{item?.storysubject}</div>
          <div className={classNames(GetRowStyle(item.due_date), 'subData')} style={{width:'8%', textAlign: 'center'}} >{item?.due_date}</div>
          <div className='data subData canClick'style={{width:'2%', textAlign: 'center'}} onClick={() => OpenPopUp(item)}> <img alt="edit icon" style={{ width: 15 }} src={String(editIcon)}></img> </div>
          </div>
          <div>
          {openPopUpToken && openPopUpToken == item && (
                  <ComboBoxPopUp data={item}  onMessage={handleMessage}
                  onClose={handleClose}/>
                )}
          </div>
          </div>
        })}
          </div>
      </div>

  );}
  else{
    return <div></div>
  }
};

export default NestedTable;


