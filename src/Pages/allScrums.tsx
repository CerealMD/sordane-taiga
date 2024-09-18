import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../componets/logoutbutton';
import ErrorPopupProps from '../componets/refresh_popup';
import RefreshFuntion from '../componets/refresh';
import '../css/personalPage.css'
import NavBar from '../componets/navTools';
import ProjectExpandableTable from '../componets/projectTable';

const AllScrums = () => {
    const [tokenInvalid, settokenInvalid] = useState<string | null>(null);
    const [allProjects, setallProjects] = useState<[]>([]);
    const [alltasks, setalltasks] = useState<{}>({});
    const navigate = useNavigate();
    const token = localStorage.getItem('taiga-token');
    const isManager = localStorage.getItem('isManager');
    let topOfScreen
    if(isManager){
      topOfScreen = <NavBar/>
    }
    else{
      topOfScreen = <div style={{width: '100%', height: '3%', paddingTop: '1%'}}><div style={{marginRight: '10px'}}><LogoutButton /></div></div>
    }
useEffect(() => {  
        const fetchData = async () => {
            console.log(isManager)
            if (isManager === 'Manager') {
              console.log('logged in')
            }
            else{
              console.log('not logged in')
                navigate('/');
            }
            try {
                const response = await axios.get('https://api.taiga.io/api/v1/tasks?project=1575333', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "x-disable-pagination": 'True'
                  },
                });
                let out = await handleData(response)
              } catch (err: any) {
                console.log(err)
                // setError('Failed to fetch data');
                if(err?.response?.data?.detail === "Given token not valid for any token type"){
                  settokenInvalid(err.message);
                  // RefreshButton();
                }
              }
    };
    async function handleData(response: any){
      let outdata =1
                // console.log(response.data)
                let useable: any = {}
                await response.data.forEach(async function(task: any) {
                   if(task?.user_story_extra_info?.subject){
                    let word = task?.user_story_extra_info?.subject
                    if(useable[word]> 0){
                      useable[word] ++
                    }         
                    else{
                      useable[word] = 1
                    }
                   }
                })
                // console.log(response.data)
                // console.log(useable)
                let storingvalues = useable
                // console.log(storingvalues)
                setalltasks(response.data)
                secondCall(storingvalues)
      return outdata
    }
    async function secondCall (numoftasks: { [x: string]: any; }){
      try {
        const response = await axios.get('https://api.taiga.io/api/v1/milestones?project=1575333', {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-disable-pagination": 'True'
          },
        });
        // console.log(numoftasks)
        await response.data.forEach(async function(scrum: any) {
            if(scrum?.user_stories)
                {
                    scrum.numOfScrum = scrum?.user_stories.length
                    await scrum.user_stories.forEach(async function(project: any) {
                        // console.log(project)
                        // console.log(numoftasks)
                        // console.log(numoftasks[project.subject])
                        if(numoftasks && numoftasks[project.subject]){
                          project.numStories = numoftasks[project.subject]
                        }
                    });
                }
            else
                {
                    scrum.numOfScrum = 0
                }
        })
        // console.log(response.data)
        setallProjects(response.data)
    } catch (err: any) {
        console.log(err)
        // setError('Failed to fetch data');
        if(err?.response?.data?.detail === "Given token not valid for any token type"){
          settokenInvalid(err.message);
          // RefreshButton();
        }
      }
    }

    fetchData()
}, []);

const handleYes = async () => {
    // console.log('User clicked Yes');
    await RefreshFuntion();
    settokenInvalid(null);
    navigate('/');
    window.location.reload();
  
  };
  
  const handleNo = () => {
    navigate('/logout');
  };
  return (
    <div style={{height: '100%'}}>
      {topOfScreen}
              {tokenInvalid && (
        <ErrorPopupProps message={tokenInvalid}  onYes={handleYes}
        onNo={handleNo}/> 
      )}
<div>
<ProjectExpandableTable data={allProjects} />
</div>
    </div>
  );
};

export default AllScrums;



