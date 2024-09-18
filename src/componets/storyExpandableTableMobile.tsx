// src/components/ExpandableTable.tsx
import React, { useState } from 'react';
import NestedTable from './nestedTable';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface Detail {
    assigned_to_extra_info: [];
    username: string;
    url: string;
    due_date: string;
    milestone_slug: string;
    status_extra_info: string;
    user_story_extra_info: string;
    namez: string;
    storysubject: string;
    id: number;
    ref: number;
    vacation: string;
    ourRole: string;
    due_date_status: string;
    subject: string;
}

interface Item {
  username: string;
  count: number;
  full_name: string;
  tasks: Detail[];
  roles: string;
  id: number;
  vacation: string
  ourRole: string
  due_date_status: string;
    subject: string;
    due_date: string
    status: string
    url: string
}

interface ExpandableTableProps {
  data: Item[];
}

const StoryExpandableTableMobile: React.FC<ExpandableTableProps> = ({ data }) => {
  const navigate = useNavigate();
  console.log(data)
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setExpandedRowId(expandedRowId == id ? null : id);
    rowSelectedCheck(id)
  };
  const getRowStyle = (index: number) => {
    return index % 2 === 0 ? 'rowEven' : 'rowOdd';
  };
  
  const rowSelectedCheck = (id: number | null) => {
    if (
      expandedRowId == id
    ){
      // console.log('yes')
      return 'rowselected'
    }
    else{
      return ''
    }
  };
  const showExtra = (index: number) => {
    if (
      expandedRowId == index
    ){
      return 'hideExtra'
    }
    else{
      return 'showExtra'
    }
  };
  const showAllExtra = (index: number) => {
    // console.log(expandedRowId)
    if (
      expandedRowId == null || expandedRowId > 0
    ){
      return 'hideExtra'
    }
    else{
      return 'showExtra'
    }
  };
  function openUsersPage(location: any) {
    navigate(`/user/${location}`)
  }
  // console.log(data)
    return <div>
    <div style={{ width: '80%', marginLeft: '10%', paddingBottom: '7px', paddingTop: '10px' }}>    
    <div>
      <div className='rowParentTH'>
      <div className='data'>User Name</div>
      <div className='data'>Subject</div>
      <div className='data'>Column</div>
      <div className='data'>Due Date</div>
</div> 
    </div>
    <div>
    {data.map((item, index)  => { 
    return <div key={item.id}>
          <div className={classNames('rowParent', getRowStyle(index), rowSelectedCheck(item.id))}>
            <div className='data' style={{ cursor: 'pointer'}}><a onClick={()=> {openUsersPage(`${item.username}`)}}>{item?.username}</a></div>
            <div className='data'><a href={item?.url} target="_blank">{item?.subject}</a></div>
            <div className='data'>{item?.status}</div>
            <div className='data'>{item?.due_date}</div>
          </div>
          <div className={showExtra(index)} >
          {expandedRowId === item.id && (
            <NestedTable details={item.tasks} />
          )}
          </div>
          <div> 
          {expandedRowId === -1 && (
            <NestedTable details={item.tasks} />
          )}
          </div>
          </div>
        })}
          </div>
      </div>
      </div>

      }
export default StoryExpandableTableMobile;

