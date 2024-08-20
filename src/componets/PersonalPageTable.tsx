// src/components/NestedTable.tsx
import React, { useEffect, useState } from 'react';
import GetRowStyle from '../componets/getRowStyle';
import classNames from 'classnames';
import ComboBoxPopUp from './comboBoxPopUp';
import { useSpinner } from './spinnerContext';
import axios from 'axios';

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

interface PersonalPageTableProps {
    myTasks: Detail[];
  username: string | undefined
}
const PersonalPageTable: React.FC<PersonalPageTableProps> = ({ myTasks,username }) => {
  const [openPopUpToken, setopenPopUpToken] = useState<object | null>(null);
  const editIcon = require('../outSideContent/edit-icon.png')
  let showableArray: any[] = []

    //    console.log(username?.toLocaleLowerCase())
    //    console.log(id)
    let tempTaskHolder = myTasks
    tempTaskHolder.forEach((task: any) => {

        if(task.assigned_to_extra_info === null){
        }
            else{
                // console.log(username)
                // console.log(task.assigned_to_extra_info.username)
                if(task.assigned_to_extra_info.username === username){
                    task.url = 'https://tree.taiga.io/project/sordane-publishing/task/'+ task.ref
                    showableArray.push(task)
                }
        }
       });
       console.log(showableArray)
        
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
if(showableArray.length > 0){
  // console.log(details)
  showableArray.forEach(item => {
  // console.log(item.id)
  })
  return (<div style={{ width: '96%', margin: 'auto 2%', paddingBottom: '10px' }}>
    <div>
      <div className='rowParentTH'>
      <div className='data subData'>Task</div>
      <div className='data subData' style={{width:'10%', textAlign: 'center'}}>Project</div>
      <div className='data subData' style={{width:'10%', textAlign: 'center'}}>Column</div>
      <div className='data subData'>Epic</div>
      <div className='data subData' style={{width:'8%', textAlign: 'center'}}>Due Date</div>
      <div className='data subData' style={{width:'2%', textAlign: 'center'}}>Edit</div>
      </div>
    </div>
    <div>
    {showableArray.map((item, index)  => { 
    return <div key={item.ref}>
      <div  className={classNames('rowParent', getRowStyle(index))}>
          <div className={classNames(GetRowStyle(item.due_date), 'canClick', 'subData')} ><a href={item?.url} target="_blank">{item?.subject}</a></div>
          <div className='data subData' style={{width:'10%', textAlign: 'center'}}>{item?.milestone_slug}</div>
          <div className='data subData' style={{width:'10%', textAlign: 'center'}}>{item?.status_extra_info.name}</div>
          <div className='data subData'>{item?.user_story_extra_info?.subject}</div>
          <div className={classNames(GetRowStyle(item.due_date), 'subData')} style={{width:'8%', textAlign: 'center'}} >{item?.due_date}</div>
          <div className='data subData canClick'style={{width:'2%', textAlign: 'center'}}><a href={item.url} target='_blank'><img alt="edit icon" style={{ width: 15 }} src={String(editIcon)}></img> </a> </div>
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

export default PersonalPageTable;


