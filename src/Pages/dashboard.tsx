import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componets/navTools';
import RefreshFuntion from '../componets/refresh';
import ErrorPopupProps from '../componets/refresh_popup';
import GetRowStyle from '../componets/getRowStyle';
import '../css/coloringtasks.css';
import '../css/darkmode.css';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tokenInvalid, settokenInvalid] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(localStorage.getItem('refresh-token'))
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
      } catch (err: any) {
        console.log(err?.response.data)
        if(err.response.data.detail == "Given token not valid for any token type"){
          settokenInvalid(err.message);
          // RefreshButton();
        }
        setError('Failed to fetch data');
      }
    };

    fetchData();
    
}, []);
const handleYes = async () => {
  console.log('User clicked Yes');
  await RefreshFuntion();
  settokenInvalid(null);
  navigate('/');
  window.location.reload();

};

const handleNo = () => {
  console.log('User clicked No');
  localStorage.removeItem('taiga-token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('activeUser');
  sessionStorage.clear();
  navigate('/');
  window.location.reload();
  settokenInvalid(null);

};
const isPageDarkMode = () => {
  let isDarkMode = localStorage.getItem('darkModeActive');
  let isDarkMode2 = JSON.stringify("true");
    if(isDarkMode === isDarkMode2){
        return ('darkModePageOff onehundred')
    } else{
        return ('darkModePageOn onehundred')
    }
}
  return (
    <div className={isPageDarkMode()}>
      {tokenInvalid && (
        <ErrorPopupProps message={tokenInvalid}  onYes={handleYes}
        onNo={handleNo}/>
      )}
      <h1 className='headerStyle' >Dashboard</h1>
      <NavBar />
      {error && <p>{error}</p>}
      <div>
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
              <td >{item?.assigned_to_extra_info?.username}</td>
              <td className={GetRowStyle(item.due_date)}>{item?.subject}</td>
              <td>{item?.milestone_slug}</td>
              <td>{item?.status_extra_info?.name}</td>
              <td>{item?.user_story_extra_info?.subject}</td>
              <td className={GetRowStyle(item.due_date)}>{item?.due_date}</td>
              <td><a href={item?.url} target="_blank">&#8634;</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Dashboard;
