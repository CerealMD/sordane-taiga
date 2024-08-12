import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componets/navTools';

const Users: React.FC = () => {
   
      
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        
      const fetchData = async () => {
        const token = localStorage.getItem('taiga-token');
        // console.log(token)
        if (token === undefined || token === null) {
        //   console.log('not logged in')
          navigate('/');
          return;
        }
        try {
          const response = await axios.get('https://api.taiga.io/api/v1/users?project=1575333', {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-disable-pagination": 'True'
            },
          });
        //   console.log(response)
        const copyArray = [...response.data]; 
        copyArray.sort((a,b) => (a.roles[0] > b.roles[0]) ? 1 : ((b.roles[0] > a.roles[0]) ? -1 : 0))
        setData(copyArray);
        } catch (err) {
          setError('Failed to fetch data');
        }
      };
  
      fetchData();
    }, []);
  
  return (
    <div>
        <h1>Users</h1>
      <NavBar />
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Roles</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item?.username}</td>
              <td>{item?.full_name}</td>
              <td>{item?.roles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default Users;
