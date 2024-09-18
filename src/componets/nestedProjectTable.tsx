// src/components/NestedTable.tsx
import React, { useEffect, useState } from 'react';
import GetRowStyle from '../componets/getRowStyle';
import classNames from 'classnames';
import ComboBoxPopUp from './comboBoxPopUp';
import { useSpinner } from './spinnerContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

interface Detail {
        name: string;
        subject: string;
        numOfTasks: number;
        closed: number;
        numStories: number;
        id: number;
        ref: number;
        user_stories: [];
}

interface NestedTableProps {
  details: Detail[];
}
const NestedProjectTable: React.FC<NestedTableProps> = ({ details }) => {
    // console.log(details)
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
  function openUsersPage(location: any) {
    navigate(`/user/${location}`)
  }
  function openEpicsPage(location: any) {
    navigate(`/story/${location}`)
  }
if(details.length > 0){
  // console.log(details)
details.forEach(item => {
  // console.log(item.id)
  })
  return (<div style={{ width: '96%', marginLeft: '2%', marginRight: '2%', paddingBottom: '10px' }}>
    <div>
      <div className='rowParentTH'>
      <div className='data2 subData' style={{width:'48%', textAlign: 'center'}}>Name</div>
      <div className='data2 subData'># of Tasks</div>
      </div>
    </div>
    <div>
    {details.map((item, index)  => { 
    return <div key={item.ref}>
      <div  className={classNames('rowParent', getRowStyle(index))}> 
          <div className='data2 subData' style={{width:'48%', textAlign: 'center', cursor: 'pointer'}}><a onClick={()=> {openEpicsPage(`${item.subject}`)}}>{item?.subject}</a></div>
          <div className={classNames('canClick', 'subData')} style={{width:'48%', textAlign: 'center', cursor: 'pointer'}}><a onClick={()=> {openEpicsPage(`${item.subject}`)}}>{item?.numStories}</a></div>
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

export default NestedProjectTable;


