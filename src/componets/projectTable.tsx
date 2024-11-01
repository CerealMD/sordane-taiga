// src/components/ExpandableTable.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NestedProjectTable from './nestedProjectTable';
import StoryPreview from './storyPreview';
import '../css/pieChart.css'
import GetRowStyle from '../componets/projectsPageRowStyle';
import classNames from 'classnames';

interface Item {
  name: string;
  closed: number;
  id: number;
  numOfTasks: number;
  numOfScrum: number;
  user_stories: [];
  ref: number
}

interface ExpandableTableProps {
  data: Item[];
}

const ProjectExpandableTable: React.FC<ExpandableTableProps> = ({ data }) => {
  const navigate = useNavigate();
  // console.log(data)
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
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
  function openUsersPage(location: any) {
    navigate(`/user/${location}`)
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const item = data.find(item => item.id === selectedId) || null;
    // console.log(item)
    setSelectedItem(item);
    if(item){
      const widthPercentage = (100 / item.user_stories.length)-1;
      if(widthPercentage>32){
        setStyle({ width: `${widthPercentage}%`});
      }
      else{
        setStyle({ width: `32.3%`});
      }
    }
    // console.log(data)
  };
    return <div style={{marginLeft: '3%', marginTop: '2%', width: '94%'}}>
      <div className='header'>Select a Project</div>
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Select an item
      </option>
      {data.map(item => (
        <option key={item.id} value={item.id}>
          {item.name} : {item.numOfScrum}
        </option>
      ))}
    </select>
    {selectedItem && (
<div className='tabelOfContents'>
  <div className='topStuff'>Legend:</div>
  <div className='topStuff'><span className={classNames(GetRowStyle('notDueSoon', false))}>Not Due Soon</span></div>
  <div className='topStuff'><span className={classNames(GetRowStyle('DueSoon', false))}>Due Soon</span></div>
  <div className='topStuff'><span className={classNames(GetRowStyle('Due', false))}>Due</span></div>
  <div className='topStuff'><span className={classNames(GetRowStyle('late', false))}>Late</span></div>
  <div className='topStuff'><span className={classNames(GetRowStyle('true', false))}>Closed</span></div>
</div>
 )}
    {selectedItem && (
      <div>
      {selectedItem.user_stories.map((project: { id: React.Key | null | undefined; }) => (
        <div className='storyPreviewWindow' style={style} key={project.id}>
        <StoryPreview selected={project}/>
        </div>
      ))}
      </div>
    )}
  </div>
      }
export default ProjectExpandableTable;

