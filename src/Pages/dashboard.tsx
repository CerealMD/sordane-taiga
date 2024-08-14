import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componets/navTools';
import RefreshFuntion from '../componets/refresh';
import ErrorPopupProps from '../componets/refresh_popup';
import DashboardDesktopView from '../componets/dashboardDesktopView';
import DashboardMobileView from '../componets/dashbaordMobileView';
import '../css/coloringtasks.css';
import '../css/darkmode.css';
import '../css/lookLikeATable.css';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tokenInvalid, settokenInvalid] = useState<string | null>(null);
  const _ = require("lodash");
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
            task.username =task?.assigned_to_extra_info?.username
            task.namez =task?.status_extra_info?.name
            task.storysubject =task.user_story_extra_info?.subject
          });
          console.log(response.data)
          
        const copyArray = [...response.data]; 
        copyArray.sort((a,b) => (a.user_story_extra_info?.subject > b.user_story_extra_info?.subject) ? 1 : ((b.user_story_extra_info?.subject > a.user_story_extra_info?.subject) ? -1 : 0))
        const projectSorted = _.sortBy(copyArray, (obj: { subject: string; }) => _.sortBy(obj, 'subject'));
        const groupedByProject = _.groupBy(projectSorted, (obj: { subject: any; }) => _.groupBy(obj.subject));
        const sortedByIdWithinGroups = _.mapValues(groupedByProject, (group: any) => _.sortBy(group, 'storysubject'));
        const finalSortedArray = _.flatten(_.values(sortedByIdWithinGroups));
        setData(finalSortedArray);
    }
      } catch (err: any) {
        console.log(err)
        if(err?.response?.data?.detail == "Given token not valid for any token type"){
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

  return (
    <div >
      {tokenInvalid && (
        <ErrorPopupProps message={tokenInvalid}  onYes={handleYes}
        onNo={handleNo}/>
      )}
      <h1 className='headerStyle' >Tasks</h1>
      <NavBar />
      {error && <p>{error}</p>}
      <div className='desktop-only'>
        <DashboardDesktopView data={data}/>
      </div>
      <div className='mobile-only'>
        <DashboardMobileView data={data}/>
      </div>
    </div>
  );
};

export default Dashboard;

