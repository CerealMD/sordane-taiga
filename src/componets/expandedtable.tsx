// src/components/ExpandableTable.tsx
import React, { useState } from 'react';
import NestedTable from './nestedTable';

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

interface Item {
  username: string;
  count: number;
  full_name: string;
  tasks: Detail[];
  roles: string;
}

interface ExpandableTableProps {
  data: Item[];
}

const ExpandableTable: React.FC<ExpandableTableProps> = ({ data }) => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setExpandedRowId(expandedRowId == id ? null : id);
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
        <th>Username</th>
            <th>Full Name</th>
            <th>Number of Tasks</th>
            <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <React.Fragment key={item.username}>
            {/* Main row */}
            <tr onClick={() => handleRowClick(item.username)} style={{ cursor: 'pointer' }}>
            <td>{item?.username}</td>
           <td>{item?.full_name}</td>
           <td>{item?.count}</td>
           <td>{item?.roles}</td>
            </tr>
            {/* Expanded content */}
            {expandedRowId === item.username  && (
              <tr>
                <td colSpan={4} style={{ padding: 0 }}>
                  <div style={{ marginTop: '10px' }}>
                    <NestedTable details={item.tasks} />
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ExpandableTable;
