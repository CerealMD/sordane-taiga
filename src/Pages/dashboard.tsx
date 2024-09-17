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
  const [patheonsData, setpatheons] = useState<any[]>([]);
  const [novelsData, setnovelsData] = useState<any[]>([]);
  const [graphicNovelsData, setgraphicNovelsData] = useState<any[]>([]);
  const [bigBadEvilGuyData, setbigBadEvilGuyData] = useState<any[]>([]);
  const [skiesAblazeData, setskiesAblazeData] = useState<any[]>([]);
  const [moonsoonData, setmoonsoonData] = useState<any[]>([]);
  const [sordaneStoriesData, setsordaneStoriesData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tokenInvalid, settokenInvalid] = useState<string | null>(null);
  const _ = require("lodash");
  const isManager = localStorage.getItem('isManager');
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(localStorage.getItem('refresh-token'))
    const fetchData = async () => {
        let response;
      const token = localStorage.getItem('taiga-token');
      // console.log(token)
      // console.log(isManager)
      if (token === undefined || token === null || isManager !== 'Manager') {
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
          // console.log(response.data)
          
        const copyArray = [...response.data]; 
        copyArray.sort((a,b) => (a.user_story_extra_info?.subject > b.user_story_extra_info?.subject) ? 1 : ((b.user_story_extra_info?.subject > a.user_story_extra_info?.subject) ? -1 : 0))
        const projectSorted = _.sortBy(copyArray, (obj: { subject: string; }) => _.sortBy(obj, 'subject'));
        const groupedByProject = _.groupBy(projectSorted, (obj: { subject: any; }) => _.groupBy(obj.subject));
        const sortedByIdWithinGroups = _.mapValues(groupedByProject, (group: any) => _.sortBy(group, 'storysubject'));
        const finalSortedArray = _.flatten(_.values(sortedByIdWithinGroups));
        seperateData(finalSortedArray);
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
  // console.log('User clicked Yes');
  await RefreshFuntion();
  settokenInvalid(null);
  navigate('/');
  window.location.reload();

};

const handleNo = () => {
  // console.log('User clicked No');
    //Block of text to logout
    localStorage.removeItem('taiga-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('activeUser');
    localStorage.removeItem('username');
    localStorage.removeItem('isManager');
    localStorage.removeItem('id');
    localStorage.removeItem('bio');
    sessionStorage.clear();
  navigate('/');
  window.location.reload();
  settokenInvalid(null);

};
function seperateData(data: any) {
  // Initialize arrays for 4 ranges
  const patheons: any[] = [];
  const novels: any[] = [];
  const bigBadEvilGuy: any[] = [];
  const skiesAblaze: any[] = [];
  const moonsoon: any[] = [];
  const sordaneStories: any[] = [];
  const graphicNovels: any[] = [];

  const roles = [
    { array: sordaneStories, value: 'sordane-stories' },
    { array: moonsoon, value: 'moonsoon'  },
    { array: skiesAblaze, value: 'skies-ablaze'  },
    { array: bigBadEvilGuy, value: 'big-bad-evil-guy'  },
    { array: novels, value: 'novels'  },
    { array: patheons, value: 'patheons'  },
    { array: graphicNovels, value: 'graphicNovels'  },
  ];

  // Separate data into ranges
  data.forEach((item: { milestone_slug: any; }) => {
    roles.forEach((role) => {
      // console.log('here', role.value)
      // console.log('here', item)
      // console.log('here', item?.milestone_slug)
      let test = JSON.stringify(item?.milestone_slug)
      let check = JSON.stringify(role.value)
      if (check == test) {
        role.array.push(item);
        // console.log('here', role.array)
      }
    });
  });
  setpatheons(patheons)
  setnovelsData(novels)
  setbigBadEvilGuyData(bigBadEvilGuy)
  setskiesAblazeData(skiesAblaze)
  setmoonsoonData(moonsoon)
  setsordaneStoriesData(sordaneStories)
  setgraphicNovelsData(graphicNovels)
}
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
        <DashboardDesktopView data={sordaneStoriesData}/>
        <DashboardDesktopView data={bigBadEvilGuyData}/>
        <DashboardDesktopView data={patheonsData}/>
        <DashboardDesktopView data={novelsData}/>
        <DashboardDesktopView data={skiesAblazeData}/>
        <DashboardDesktopView data={moonsoonData}/>
        <DashboardDesktopView data={graphicNovelsData}/>
      </div>
      <div className='mobile-only'>
        <DashboardMobileView data={sordaneStoriesData}/>
        <DashboardMobileView data={bigBadEvilGuyData}/>
        <DashboardMobileView data={patheonsData}/>
        <DashboardMobileView data={novelsData}/>
        <DashboardMobileView data={skiesAblazeData}/>
        <DashboardMobileView data={moonsoonData}/>
        <DashboardMobileView data={graphicNovelsData}/>
      </div>
    </div>
  );
};

export default Dashboard;

