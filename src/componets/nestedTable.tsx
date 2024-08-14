// src/components/NestedTable.tsx
import React from 'react';
import GetRowStyle from '../componets/getRowStyle';

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
}

interface NestedTableProps {
  details: Detail[];
}

const NestedTable: React.FC<NestedTableProps> = ({ details }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
          <tr key={tasks.username}>
                    <td >{tasks.username}</td>
                      <td className={GetRowStyle(tasks.due_date)}>{tasks.subject}</td>
                      <td>{tasks.milestone_slug}</td>
                      <td>{tasks.namez}</td>
                      <td>{tasks.subject}</td>
                      <td className={GetRowStyle(tasks.due_date)}>{tasks.due_date}</td> 
                   <td><a href={tasks.url} target="_blank">&#8634;</a></td> 
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NestedTable;
