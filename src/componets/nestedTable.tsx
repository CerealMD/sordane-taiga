// src/components/NestedTable.tsx
import React from 'react';
import GetRowStyle from '../componets/getRowStyle';
import classNames from 'classnames';

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
  const getRowStyle = (index: number) => {
    return index % 2 === 0 ? 'rowEven2' : 'rowOdd2';
  };

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
    return <div key={item.ref} className={classNames('rowParent', getRowStyle(index))}>
          <div className='data subData' style={{width:'13%', textAlign: 'center'}}><a href={item?.url} target="_blank">{item?.username}</a></div>
          <div className={classNames(GetRowStyle(item.due_date), 'canClick', 'subData')} >{item?.subject}</div>
          <div className='data subData' style={{width:'10%', textAlign: 'center'}}>{item?.milestone_slug}</div>
          <div className='data subData' style={{width:'10%', textAlign: 'center'}}>{item?.namez}</div>
          <div className='data subData'>{item?.storysubject}</div>
          <div className={classNames(GetRowStyle(item.due_date), 'subData')} style={{width:'8%', textAlign: 'center'}} >{item?.due_date}</div>
          <div className='data subData canClick'style={{width:'2%', textAlign: 'center'}}><a href={item?.url} target="_blank">&#8634;</a></div>
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


