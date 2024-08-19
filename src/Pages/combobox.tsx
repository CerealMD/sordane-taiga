import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componets/navTools';
import '../css/darkmode.css';
import '../css/lookLikeATable.css';
import '../css/cssIcons.css';
import ExpandableTable from '../componets/expandedtable';
import RefreshFuntion from '../componets/refresh';
import ExpandedtableMobile from '../componets/expandedtableMobile';
import ErrorPopupProps from '../componets/refresh_popup';
import { useSpinner } from '../componets/spinnerContext';

const Combobox: React.FC = () => {
    // let data = [{username: 'Example', count: 0}];
    const [error, setError] = useState<string | null>(null);
    const [artistData, setartistData] = useState<any[]>([]);
    const [scuplterData, setsculpterData] = useState<any[]>([]);
    const [writtingData, setwrittingData] = useState<any[]>([]);
    const [managementData, setmanagementData] = useState<any[]>([]);
  const [tokenInvalid, settokenInvalid] = useState<string | null>(null);
  const { showSpinner, hideSpinner } = useSpinner();
  const [response, setResponse] = useState<object | null>(null);
    const navigate = useNavigate();
    let uData = JSON.stringify({});
    let tData = JSON.stringify({});
    const _ = require("lodash");
  var order = ["Artist", "Sculpting", "Writing", "Manager"];
    
    useEffect(() => {

    //     // Define async function inside useEffect
    //     const fetchData2 = async () => {
    //       const token = localStorage.getItem('taiga-token');
    // let counter =0
    //       const config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: 'https://api.taiga.io/api/v1/task-statuses?project=1575333',
    //         headers: { 
    //           'Authorization': `Bearer ${token}`, 
    //           'Content-Type': 'application/json'
    //         }
    //       };
    // if(counter<1){
    //     counter ++
    //       try {
    //         console.log('data')
    //         showSpinner();
    //         const response = await axios.request(config);
    //         localStorage.setItem('task-columns', response.data);
    //         console.log(response.data)
    //       } catch (error) {
    //         setError('An error occurred while fetching data.');
    //         console.error(error);
    //       } finally {
    //         hideSpinner();
    //       }}
    //     };
    
    //     // Fetch data when component mounts
    //     fetchData2();

    
        const fetchData = async () => {
            // console.log(artistData)
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
        if(artistData && artistData.length >= userData.length){
            return
        }
        if(tData){
        let taskData = JSON.parse(tData)
        // console.log(userData)
        // console.log(taskData)
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
                        taskData[j].storysubject =taskData[j].user_story_extra_info?.subject
                        taskData[j].url= 'https://tree.taiga.io/project/sordane-publishing/task/' + taskData[j].ref 
                        userData[i].tasks.push(taskData[j]); 

                    }
                };
                setartistData(userData);
            };
            const copyArray = [...userData]; 
            copyArray.sort((a,b) => (a.roles[0] > b.roles[0]) ? 1 : ((b.roles[0] > a.roles[0]) ? -1 : 0))
            // console.log(copyArray)
            const roleSorted = _.sortBy(copyArray, (obj: { roles: string | any[]; }) => getRoleIndex(obj.roles));
            const groupedByRole = _.groupBy(roleSorted, (obj: { roles: any; }) => _.find(obj.roles, (role: any) => order.includes(role)));
            const sortedByIdWithinGroups = _.mapValues(groupedByRole, (group: any) => _.sortBy(group, 'count'));
            const finalSortedArray = _.flatten(_.values(sortedByIdWithinGroups));
            seperateData(finalSortedArray);
            // console.log(finalSortedArray)
            // setartistData(finalSortedArray); 
        }
        catch{
            console.log('catch',artistData)
        }}}
    }
    
    
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
  localStorage.removeItem('taiga-token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('activeUser');
  sessionStorage.clear();
  navigate('/');
  window.location.reload();
  settokenInvalid(null);

};
function getRoleIndex(roles: string | any[]) {
  return _.findIndex(order, (role: string) => roles.includes(role));
}
function seperateData(data: any) {
  // Initialize arrays for 4 ranges
  const Artist: any[] = [];
  const Sculpting: any[] = [];
  const Writing: any[] = [];
  const Manager: any[] = [];

  const roles = [
    { array: Artist, value: 'Artist' },
    { array: Sculpting, value: 'Sculpting'  },
    { array: Writing, value: 'Writing'  },
    { array: Manager, value: 'Manager'  },
  ];

  // Separate data into ranges
  data.forEach((item: { roles: { array: any[]; }[]; }) => {
    roles.forEach((role) => {
      // console.log('here', role.value)
      // console.log('here', item)
      // console.log('here', item?.roles[0])
      let test = JSON.stringify(item?.roles[0])
      let check = JSON.stringify(role.value)
      if (check == test) {
        role.array.push(item);
        // console.log('here', role.array)
      }
    });
  });
  setartistData(Artist)
  setsculpterData(Sculpting)
  setwrittingData(Writing)
  setmanagementData(Manager)
}
    return (
        <div >
                {tokenInvalid && (
        <ErrorPopupProps message={tokenInvalid}  onYes={handleYes}
        onNo={handleNo}/>
      )}
        <h1 className='headerStyle'>Combo Box</h1>
      <NavBar />
      {error && <p>{error}</p>}
      <div>
      <div className='desktop-only'>
      <ExpandableTable data={artistData} />
      <ExpandableTable data={scuplterData} />
      <ExpandableTable data={writtingData} />
      <ExpandableTable data={managementData} />
      </div>
      <div className='mobile-only'>
        <ExpandedtableMobile data={artistData}/>
        <ExpandedtableMobile data={scuplterData} />
        <ExpandedtableMobile data={writtingData} />
        <ExpandedtableMobile data={managementData} />
      </div>
      </div>
    </div>
  );
}

export default Combobox;



