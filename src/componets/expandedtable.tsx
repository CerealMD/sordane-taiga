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
  
  // console.log(data)
    return <div>
    <div style={{ width: '80%', marginLeft: '10%', paddingBottom: '7px', paddingTop: '10px' }}>    
    <div>
      <div className='rowParentTH'>
      <div className='data'>User Name</div>
      <div className='data'>Full Name</div>
      <div className='data'>Number of Tasks</div>
      <div className='data'>Role</div>
      <div className={classNames(showAllExtra(-2), 'bigExpandCollapse' )}><button onClick={() => handleRowClick(-1)}>Collapse All</button> </div>
      <div className={classNames(showExtra(-1),  'bigExpandCollapse')}><button onClick={() => handleRowClick(-1)}>Expand All</button> </div>
      <div className={classNames(showAllExtra(-2), 'smallExpandCollapse')}><button className='circle minus' onClick={() => handleRowClick(-1)}></button> </div>
      <div className={classNames(showExtra(-1), 'smallExpandCollapse')}><button className='circle plus' onClick={() => handleRowClick(-1)}></button> </div>
      </div> 
    </div>
    <div>
    {data.map((item, index)  => { 
    return <div key={item.id}>
          <div onClick={() => handleRowClick(item.id)} className={classNames('rowParent', getRowStyle(index), rowSelectedCheck(item.id))}>
            <div className='data'>{item?.username}</div>
            <div className='data'> {item?.full_name}</div>
            <div className='data'>{item?.count}</div>
            <div className='data'>{item?.roles}</div>
            <div className='smallExpandCollapse'></div>
            <div className='bigExpandCollapse'></div>
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
export default ExpandableTable;

