import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componets/navTools';

const Combobox: React.FC = () => {
    // let data = [{username: 'Example', count: 0}];
    const [error, setError] = useState<string | null>(null);
    const [data2, setData2] = useState<any[]>([]);
    const navigate = useNavigate();
    let uData = JSON.stringify({});
    let tData = JSON.stringify({});
    useEffect(() => {
    
        const fetchData = async () => {
            // console.log(data2)
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
            uData = JSON.stringify(response.data)
            compareArrays();
            } catch (err) {
                console.log(err)
              setError('Failed to fetch data');
            }
            try {
                const response = await axios.get('https://api.taiga.io/api/v1/tasks?project=1575333', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "x-disable-pagination": 'True'
                  },
                });
                tData = JSON.stringify(response.data)
                compareArrays();
              } catch (err) {
                console.log(err)
                setError('Failed to fetch data');
              }
    };
    fetchData()
    function compareArrays() {
    if(uData){
        let userData = JSON.parse(uData)
        // console.log('65',data)
        // console.log('66',userData)
        if(data2 && data2.length >= userData.length){
            return
        }
        if(tData){
        let taskData = JSON.parse(tData)
        console.log(userData)
        console.log(taskData)
        try{
            // console.log(userData.length)
            for(let i=0; i< userData.length; i++) {
                userData[i].count = 0;
                // console.log(user)
                for(let j=0; j< taskData.length; j++) {

                    if (userData[i].username === taskData[j]?.assigned_to_extra_info?.username && !taskData[j]?.is_closed){
                        userData[i].count++
                    }
                };
                setData2(userData);
            };
            // console.log(data)
            
        }
        catch{
            console.log('catch',data2)
        }}}
    }
    
    
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
            <th>Number of Tasks</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
        {data2.map((item: any) => (
           <tr key={item.id}>
           <td>{item?.username}</td>
           <td>{item?.full_name}</td>
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

