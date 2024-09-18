import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../componets/logoutbutton';
import ErrorPopupProps from '../componets/refresh_popup';
import RefreshFuntion from '../componets/refresh';
// import BooleanSlider from '../componets/Slider';
import '../css/personalPage.css'
// import NestedTable from '../componets/nestedTable';
import NavBar from '../componets/navTools';
import { ColorPieChart } from '../componets/pieChart';
import StoryExpandableTable from '../componets/storyExpandTable';
import StoryExpandableTableMobile from '../componets/storyExpandableTableMobile';

const StorysMainPage = () => {
    const { userStory } = useParams();
    const [tokenInvalid, settokenInvalid] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('taiga-token');
    const isManager = localStorage.getItem('isManager');
    let tempallcurrentTasks: any[] = []
    const [allcurrentTasks, setallcurrentTasks] = useState<any[]>([]);
    let topOfScreen
    const [pieChartData4Column, setPieChartData4Column] = useState<{ name: string; value: number }[]>([]);
    const [pieChartData4Closed, setPieChartData4Closed] = useState<{ name: string; value: number }[]>([]);
    const [pieChartData4DueDate, setPieChartData4DueDate] = useState<{ name: string; value: number }[]>([]);
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
                response.data.forEach(function(task: any) {
                 if(userStory === task?.user_story_extra_info?.subject){
                  task.username = task?.assigned_to_extra_info?.username
                  task.full_name = task?.assigned_to_extra_info?.full_name_display
                  task.status = task?.status_extra_info?.name
                  task.url = 'https://tree.taiga.io/project/sordane-publishing/task/'+ task.ref
                  tempallcurrentTasks.push(task)
                  // console.log(task)
                 }
                });
                setallcurrentTasks(tempallcurrentTasks)
                setPieChartData4Column(flattenData4Column(tempallcurrentTasks))
                setPieChartData4Closed(flattenData4Closed(tempallcurrentTasks))
                setPieChartData4DueDate(flattenData4DueDate(tempallcurrentTasks))
                // console.log(pieChartData)
              } catch (err: any) {
                console.log(err)
                // setError('Failed to fetch data');
                if(err?.response?.data?.detail === "Given token not valid for any token type"){
                  settokenInvalid(err.message);
                  // RefreshButton();
                }
              }

    };

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
<div className='boxHolder'>
<div className='pieBox'>
<div className='pieChartCSS'>What Column</div>
<ColorPieChart data={pieChartData4Column} />
</div>
<div className='pieBox'>
<div className='pieChartCSS'>%Closed</div>
<ColorPieChart data={pieChartData4Closed} />
</div>
<div className='pieBox'>
<div className='pieChartCSS'>Due Status</div>
<ColorPieChart data={pieChartData4DueDate} />
</div>
</div>
<div className='desktop-only storyTable'>
<StoryExpandableTable data={allcurrentTasks}/>
</div>
<div className='mobile-only storyTable'>
<StoryExpandableTableMobile data={allcurrentTasks}/>
</div>
</div>
  );
};

export default StorysMainPage;



function flattenData4Column(allcurrentTasks: any[]) {
  // Transform data to count occurrences
const countData = allcurrentTasks.reduce((acc, item) => {
  acc[item.status_extra_info.name] = (acc[item.status_extra_info.name] || 0) + 1;
  return acc;
}, {});

// Convert to array format for pie chart
const pieChartData = Object.keys(countData).map(key => ({
  name: key,
  value: countData[key],
}));

return pieChartData
}


function flattenData4Closed(allcurrentTasks: any[]) {
  // Transform data to count occurrences
const countData = allcurrentTasks.reduce((acc, item) => {
  acc[item.is_closed] = (acc[item.is_closed] || 0) + 1;
  return acc;
}, {});

// Convert to array format for pie chart
const pieChartData = Object.keys(countData).map(key => ({
  name: key,
  value: countData[key],
}));

return pieChartData
}
function flattenData4DueDate(allcurrentTasks: any[]) {
  // Transform data to count occurrences
const countData = allcurrentTasks.reduce((acc, item) => {
  acc[item.due_date_status] = (acc[item.due_date_status] || 0) + 1;
  return acc;
}, {});

// Convert to array format for pie chart
const pieChartData = Object.keys(countData).map(key => ({
  name: key,
  value: countData[key],
}));

return pieChartData
}
