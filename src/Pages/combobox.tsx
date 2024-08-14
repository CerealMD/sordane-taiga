import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componets/navTools';
import '../css/darkmode.css';
import ExpandableTable from '../componets/expandedtable';

const Combobox: React.FC = () => {
    // let data = [{username: 'Example', count: 0}];
    const [error, setError] = useState<string | null>(null);
    const [data2, setData2] = useState<any[]>([]);
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
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
                userData[i].tasks = [];
                // console.log(user)
                for(let j=0; j< taskData.length; j++) {

                    if (userData[i].username === taskData[j]?.assigned_to_extra_info?.username && !taskData[j]?.is_closed){
                        userData[i].count++
                        taskData[j].username =taskData[j].assigned_to_extra_info.username
                        taskData[j].namez =taskData[j].status_extra_info?.name
                        taskData[j].subject =taskData[j].user_story_extra_info?.subject
                        taskData[j].url= 'https://tree.taiga.io/project/sordane-publishing/task/' + taskData[j].ref 
                        userData[i].tasks.push(taskData[j]); 

                    }
                };
                setData2(userData);
            };
            const copyArray = [...userData]; 
            copyArray.sort((a,b) => (a.roles[0] > b.roles[0]) ? 1 : ((b.roles[0] > a.roles[0]) ? -1 : 0))
            console.log(copyArray)
            setData2(copyArray); //re-render
            
        }
        catch{
            console.log('catch',data2)
        }}}
    }
    
    
}, []);
const isPageDarkMode = () => {
  let isDarkMode = localStorage.getItem('darkModeActive');
  let isDarkMode2 = JSON.stringify("true");
    if(isDarkMode == isDarkMode2){
        return 'darkModePageOff onehundred'
    } else{
        return "darkModePageOn onehundred"
    }
}

const toggleRow = (username: string) => {
  console.log(username)
  if(expandedRowId !== username ){
  setExpandedRowId(username);}
  else{
    setExpandedRowId(null)
  }
};
    return (
        <div className={isPageDarkMode()}>
        <h1 className='headerStyle'>Combo Box</h1>
      <NavBar />
      {error && <p>{error}</p>}
      <div>
      <ExpandableTable data={data2} />
      </div>
    </div>
  );
}

export default Combobox;

{/* <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Full Name</th>
            <th>Number of Tasks</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>

        {data2.sort((a, b) => a.itemM?.roles > b.itemM?.roles ? 1 : -1).map(item => (
          <React.Fragment key={item.id}>
            <tr onClick={() => toggleRow(item.id)} style={{ cursor: 'pointer' }}>
            <td>{item?.username}</td>
           <td>{item?.full_name}</td>
           <td>{item?.count}</td>
           <td>{item?.roles}</td>
            </tr>
          {item.tasks &&expandedRowId === item.id && item.tasks.map((tasks: any) => (
              <tr>
              <td colSpan={4}>
                <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
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
                    
                      <tr key={tasks.ref} style={{ backgroundColor: '#f9f9f9' }}>
                      <td >{tasks?.assigned_to_extra_info?.username}</td>
                      <td className={GetRowStyle(tasks?.due_date)}>{tasks?.subject}</td>
                      <td>{tasks?.milestone_slug}</td>
                      <td>{tasks?.status_extra_info?.name}</td>
                      <td>{tasks?.user_story_extra_info?.subject}</td>
                      <td className={GetRowStyle(tasks?.due_date)}>{tasks.due_date}</td> 
                   <td><a href={tasks?.url} target="_blank">&#8634;</a></td> 
                     </tr>
                    
                  </tbody>
                </table>
              </td>
              </tr> 
            ))}  
          </React.Fragment>
        ))}
         
        </tbody>
      </table> */}