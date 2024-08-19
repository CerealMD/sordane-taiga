// src/components/ExpandableTable.tsx
import React, { useState } from 'react';
import NestedTable from './nestedTableMobile';
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

const ExpandedtableMobile: React.FC<ExpandableTableProps> = ({ data }) => {
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
    return <div style={{ width: '80%', marginLeft: '10%', paddingBottom: '10px' }}>
    <div>
      <div className='rowParentTH'>
      <div className='data'>User Name</div>
      <div className='data changeNumSmall'># of Tasks</div>
      <div className='data changeNumBig'>Number of Tasks</div>
      <div className='data'>Role</div>
      <div className={classNames(showAllExtra(-2), 'smallExpandCollapse')}><button className='circle minus' onClick={() => handleRowClick(-1)}></button> </div>
      <div className={classNames(showExtra(-1), 'smallExpandCollapse')}><button className='circle plus' onClick={() => handleRowClick(-1)}></button> </div>
      </div>
    </div>
    <div>
    {data.map((item, index)  => { 
    return <div key={item.id}>
          <div onClick={() => handleRowClick(item.id)} className={classNames('rowParent', getRowStyle(index), rowSelectedCheck(item.id))}>
            <div className='data dataComboBox'>{item?.username}</div>
            <div className='data dataComboBox'>{item?.count}</div>
            <div className='data dataComboBox'>{item?.roles}</div>
            <div className='smallExpandCollapse'></div>
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


      }
export default ExpandedtableMobile;

