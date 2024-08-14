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
    const _ = require("lodash");
  var order = ["Artist", "Sculpting", "Writing", "Manager"];
    
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
                setData2(userData);
            };
            const copyArray = [...userData]; 
            copyArray.sort((a,b) => (a.roles[0] > b.roles[0]) ? 1 : ((b.roles[0] > a.roles[0]) ? -1 : 0))
            // console.log(copyArray)
            const roleSorted = _.sortBy(copyArray, (obj: { roles: string | any[]; }) => getRoleIndex(obj.roles));
            const groupedByRole = _.groupBy(roleSorted, (obj: { roles: any; }) => _.find(obj.roles, (role: any) => order.includes(role)));
            const sortedByIdWithinGroups = _.mapValues(groupedByRole, (group: any) => _.sortBy(group, 'count').reverse());
            const finalSortedArray = _.flatten(_.values(sortedByIdWithinGroups));
            // console.log(finalSortedArray)
            setData2(finalSortedArray); 
        }
        catch{
            console.log('catch',data2)
        }}}
    }
    
    
}, []);
function getRoleIndex(roles: string | any[]) {
  return _.findIndex(order, (role: string) => roles.includes(role));
}

    return (
        <div >
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

