// src/components/ExpandableTable.tsx
import React, { useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import NestedProjectTable from './nestedProjectTable';

interface Item {
  name: string;
  closed: number;
  id: number;
  numOfTasks: number;
  numOfScrum: number;
  user_stories: [];
}

interface ExpandableTableProps {
  data: Item[];
}

const ProjectExpandableTable: React.FC<ExpandableTableProps> = ({ data }) => {
  const navigate = useNavigate();
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
  function openUsersPage(location: any) {
    navigate(`/user/${location}`)
  }
  // console.log(data)
    return <div>
    <div style={{ width: '80%', marginLeft: '10%', paddingBottom: '7px', paddingTop: '10px' }}>    
    <div>
      <div className='rowParentTH'>
      <div className='data2'>Name</div>
      <div className='data2'># of Scums</div>
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
            <div className='data2'>{item?.name}</div>
            <div className='data2'> {item?.numOfScrum}</div>
            <div className='smallExpandCollapse'></div>
            <div className='bigExpandCollapse'></div>
          </div>
          <div className={showExtra(index)} >
          {expandedRowId === item.id && (
            <NestedProjectTable details={item.user_stories} />
          )}
          </div>
          <div> 
          {expandedRowId === -1 && (
            <NestedProjectTable details={item.user_stories} />
          )}
          </div>
          </div>
        })}
          </div>
      </div>
      </div>

      }
export default ProjectExpandableTable;

