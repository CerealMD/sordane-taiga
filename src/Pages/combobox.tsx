import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../componets/logout';
import NavBar from '../componets/navTools';
import { forEachChild } from 'typescript';

const Combobox: React.FC = () => {
    // let data = [{username: 'Example', count: 0}];
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [data2, setData2] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
    
        const fetchData = async () => {
            if(data){
                // console.log(data)
                setData2(data);
                return
            }
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
            localStorage.setItem('users', JSON.stringify(response.data));
            } catch (err) {
              setError('Failed to fetch data');
            }
            try {
                const response = await axios.get('https://api.taiga.io/api/v1/tasks?project=1575333', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "x-disable-pagination": 'True'
                  },
                });
                localStorage.setItem('tasks', JSON.stringify(response.data));
              } catch (err) {
                setError('Failed to fetch data');
              }
    };
    fetchData()
    function compareArrays() {
        let uData = localStorage.getItem('users');
        let tData = localStorage.getItem('tasks');
        
        
        if(uData){
        let userData = JSON.parse(uData)
        // console.log('65',data)
        // console.log('66',userData)
        if(data.length >= userData.length){
            return
        }
        if(tData){
        let taskData = JSON.parse(tData)
        try{
            let id = 0;
            for(let i=0; i< userData.length; i++) {
                let usercount = 0;
                // console.log(user)
                for(let j=0; j< taskData.length; j++) {
                    if (userData[i].username === taskData[j]?.assigned_to_extra_info?.username){
                        usercount ++;
                    }
                };
                let variable = {id: id, username: userData[i].username, count:usercount, roles:userData[i]?.roles[0]}
                data.push(variable);
                id++;
                // console.log(data)
            };
            // console.log(data)
            
        }
        catch{
            console.log('catch',data)
        }}}
    }
    compareArrays();
    
    }
    
);

      
 
    return (
        <div>
        <h1>Users</h1>
      <NavBar />
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Number of Tasks</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
        {data2.map((item: any) => (
           <tr key={item.id}>
           <td>{item?.username}</td>
           <td>{item?.count}</td>
           <td>{item?.roles}</td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Combobox;

