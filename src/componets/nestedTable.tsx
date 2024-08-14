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
  return (<div style={{ width: '100%', marginLeft: '2%', marginRight: '2%', padding: '10px' }}>
    <div>
      <div className='rowParentTH'>
      <div className='data'>Assigned To</div>
      <div className='data'>Task</div>
      <div className='data'>Project</div>
      <div className='data'>Column</div>
      <div className='data'>Epic</div>
      <div className='data'>Due Date</div>
      <div className='data'>Edit</div>
      </div>
    </div>
    <div>
    {details.map((item, index)  => { 
    return <div key={item.ref} className={classNames('rowParent', getRowStyle(index))}>
          <div className='data'>{item?.username}</div>
          <div className={GetRowStyle(item.due_date)} >{item?.subject}</div>
          <div className='data'>{item?.milestone_slug}</div>
          <div className='data'>{item?.namez}</div>
          <div className='data'>{item?.storysubject}</div>
          <div className={GetRowStyle(item.due_date)}>{item?.due_date}</div>
          <div className='data'><a href={item?.url} target="_blank">&#8634;</a></div>
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


{/* <table style={{ width: '100%', borderCollapse: 'collapse' }}>
<thead>
  <tr>
  <th>Assigned To</th>
                <th>Task</th>
                <th>Project</th>
                <th>Column</th>
                <th>Epic</th>
                <th>Due Date</th> 
                 <th>Edit</th> 
  </tr>
</thead>
<tbody>
  {details.map(tasks => (
    <tr key={tasks.id}>
              <td >{tasks.username}</td>
                <td className={GetRowStyle(tasks.due_date)}>{tasks.subject}</td>
                <td>{tasks.milestone_slug}</td>
                <td>{tasks.namez}</td>
                <td>{tasks.storysubject}</td>
                <td className={GetRowStyle(tasks.due_date)}>{tasks.due_date}</td> 
             <td><a href={tasks.url} target="_blank">&#8634;</a></td> 
    </tr>
  ))}
</tbody>
</table> */}