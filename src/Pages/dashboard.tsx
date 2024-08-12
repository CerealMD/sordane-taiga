import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componets/navTools';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
   
    const fetchData = async () => {
        let response;
      const token = localStorage.getItem('taiga-token');
    //   console.log(token)
      if (token === undefined || token === null) {
        // console.log('not logged in')
        navigate('/');
        return;
      }
      try {
        if(!response)
            {
        response = await axios.get('https://api.taiga.io/api/v1/tasks?project=1575333', {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-disable-pagination": 'True'
          },
        });
        // console.log(response)
        response.data.forEach(function(task: any) {
            task.url = 'https://tree.taiga.io/project/sordane-publishing/task/' + task.ref
          });
          console.log(response.data)
        const copyArray = [...response.data]; 
        copyArray.sort((a,b) => (a.user_story_extra_info?.subject > b.user_story_extra_info?.subject) ? 1 : ((b.user_story_extra_info?.subject > a.user_story_extra_info?.subject) ? -1 : 0))
        setData(copyArray);
    }
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
}, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <NavBar />
      {error && <p>{error}</p>}
      <table>
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
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item?.assigned_to_extra_info?.username}</td>
              <td>{item?.subject}</td>
              <td>{item?.milestone_slug}</td>
              <td>{item?.status_extra_info?.name}</td>
              <td>{item?.user_story_extra_info?.subject}</td>
              <td>{item?.due_date}</td>
              <td><a href={item?.url} target="_blank">&#8634;</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
