import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorPopupProps from '../componets/refresh_popup';
import RefreshFuntion from '../componets/refresh';
// import BooleanSlider from '../componets/Slider';
import '../css/pieChart.css'
// import NestedTable from '../componets/nestedTable';
import ProgressBar from '../componets/progressBar';
import GetRowStyle from '../componets/projectsPageRowStyle';
import classNames from 'classnames';

const StoryPreview = (selectedItem: any) => {
    const  userStory  = selectedItem['selected']
    const [tokenInvalid, settokenInvalid] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('taiga-token');
    const isManager = localStorage.getItem('isManager');
    let tempallcurrentTasks: any[] = []
    const _ = require("lodash");
    const customOrder = ['To Do', 'Concept Art', 'Color Art', 'Review Art', 'Sculpting', 'Review Sculpting', 'Cutting', 'Supporting', 'Approved Sculpting', 'Done', 'Writing', 'Writing Review', 'Editing', 'Approved Writing'];
    const [allcurrentTasks, setallcurrentTasks] = useState<any[]>([]);
    const [pieChartData4Closed, setPieChartData4Closed] = useState<{ name: string; value: number; progress: number; }[]>([]);
useEffect(() => {  
    // console.log(userStory)
        const fetchData = async () => {
            // console.log(isManager)
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
                 if(userStory.subject === task?.user_story_extra_info?.subject){
                  task.username = task?.assigned_to_extra_info?.username
                  task.full_name = task?.assigned_to_extra_info?.full_name_display
                  task.status = task?.status_extra_info?.name
                  task.url = 'https://tree.taiga.io/project/sordane-publishing/task/'+ task.ref
                  tempallcurrentTasks.push(task)
                 }
                });
                const sortedItems = [...tempallcurrentTasks].sort((a, b) => {
                      return customOrder.indexOf(a.status) - customOrder.indexOf(b.status);
                    });
                    console.log(sortedItems)
                setallcurrentTasks(sortedItems);
                setPieChartData4Closed(await flattenData4Closed(sortedItems))
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
//   console.log(pieChartData4Column)
  return (
    <div style={{height: '100%'}}>
              {tokenInvalid && (
        <ErrorPopupProps message={tokenInvalid}  onYes={handleYes}
        onNo={handleNo}/> 
      )}      
        <div  style={{width: '100%', float:'left'}}>
        <ProgressBar progress={pieChartData4Closed[1]} />
<div style={{borderTop: '1px black solid'}}>
    <div style={{textAlign: 'center', fontWeight: 'bold', height: '45px'}}>
    {userStory.subject}
    </div>
    <div >
            <div className='showItems'>
            <div className='storyName'>
             Task
            </div> 
            <div className='status'>
             Person
            </div> 
            <div className='status'>
             Status
            </div>
            </div>
            <br/>
        </div>
{allcurrentTasks.map((task) => (
        <div  key={task.id}>
            <div className={classNames(GetRowStyle(task.due_date), 'showItems')}>
            <div className='storyName'>
             {task.subject}
            </div> 
            <div className='status'>
             {task.username}
            </div> 
            <div className='status'>
             {task.status}
            </div>
            </div>
            <br/>
        </div>
      ))}
</div>
        
        </div>
        
</div>
  );
};

export default StoryPreview;

function flattenData4Closed(allcurrentTasks: any[]) {
// console.log(allcurrentTasks)

  // Transform data to count occurrences
const countData = allcurrentTasks.reduce((acc, item) => {
  acc[item.is_closed] = (acc[item.is_closed] || 0) + 1;
  return acc;
}, {});

// Convert to array format for pie chart
const pieChartData = Object.keys(countData).map(key => ({
  name: key,
  value: countData[key],
  progress: Math.round(((allcurrentTasks.length-countData[key])/allcurrentTasks.length)*100)
}));
// console.log(pieChartData)
return pieChartData
}