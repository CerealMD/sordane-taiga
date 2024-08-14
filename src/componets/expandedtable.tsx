// src/components/ExpandableTable.tsx
import React, { useState } from 'react';
import NestedTable from './nestedTable';
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

interface Item {
  username: string;
  count: number;
  full_name: string;
  tasks: Detail[];
  roles: string;
  id: number;
}

interface ExpandableTableProps {
  data: Item[];
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ data }) => {
  // console.log(data)
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setExpandedRowId(expandedRowId == id ? null : id);
  };
  const getRowStyle = (index: number) => {
    return index % 2 === 0 ? 'rowEven' : 'rowOdd';
  };
  
  const rowSelectedCheck = (id: number | null) => {
    return expandedRowId == id ? 'selected' : '';
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
  // console.log(data)
    return <div style={{ width: '80%', marginLeft: '10%', padding: '10px' }}>
    <div>
      <div className='rowParentTH'>
      <div className='data'>User Name</div>
      <div className='data'>Full Name</div>
      <div className='data'>Number of Tasks</div>
      <div className='data'>Role</div>
      </div>
    </div>
    <div>
    {data.map((item, index)  => { 
    return <div key={item.id}>
          <div onClick={() => handleRowClick(item.id)} className={classNames('rowParent', getRowStyle(index), rowSelectedCheck(index))}>
            <div className='data'>{item?.username}</div>
            <div className='data'> {item?.full_name}</div>
            <div className='data'>{item?.count}</div>
            <div className='data'>{item?.roles}</div>
          </div>
          <div className={showExtra(index)} style={{ marginTop: '10px' }}>
          {expandedRowId === item.id && (
            <NestedTable details={item.tasks} />
          )}
          </div>
          </div>
        })}
          </div>
      </div>


      }
export default ExpandableTable;

