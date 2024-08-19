// src/components/NestedTable.tsx
import React, { useState } from 'react';
import GetRowStyle from '../componets/getRowStyle';
import classNames from 'classnames';
import DrillDownPopUp from './drillDownPopUp';

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
  const [openPopUpToken, setopenPopUpToken] = useState<object | null>(null);
  const editIcon = require('../outSideContent/edit-icon.png')

  const getRowStyle = (index: number) => {
    return index % 2 === 0 ? 'rowEven2' : 'rowOdd2';
  };

if(details.length > 0){
  // console.log(details)
details.forEach(item => {
  // console.log(item.id)
  })
  const openPopUp = (item: Detail) => {
    // console.log(item)
    setopenPopUpToken(item);
    
  };
  const handleMessage = async () => {

    setopenPopUpToken(null);
  
  };
  
  const handleClose = () => {

    setopenPopUpToken(null);
  };
  return (<div style={{ width: '100%'}}>
    <div>
      <div className='rowParentTH'>
      <div className='data dataComboBox'>Task</div>
      <div className='data dataComboBox'>Project</div>
      <div className='data dataComboBox'>Due Date</div>
      <div className='data' style={{width: '10%'}}>Edit</div>
      </div>
    </div>
    <div>
    {details.map((item, index)  => { 
    return <div key={index}>
    <div  className={classNames('rowParent', getRowStyle(index))}>
          <div className={classNames('dataComboBox', GetRowStyle(item.due_date))} >{item?.subject}</div>
          <div className='data dataComboBox'>{item?.milestone_slug}</div>
          <div className={classNames('dataComboBox', GetRowStyle(item.due_date))}>{item?.due_date}</div>
          <div className='data' style={{width: '10%', textAlign: 'center', cursor: 'pointer'}}><a onClick={() => openPopUp(item)} ><img alt="edit icon" style={{ width: 15 }} src={String(editIcon)}></img></a></div>
          </div>
          <div>
          {openPopUpToken && openPopUpToken == item && (
                  <DrillDownPopUp data={item}  onMessage={handleMessage}
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
