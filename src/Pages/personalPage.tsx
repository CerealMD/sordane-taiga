// src/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../componets/logoutbutton';
import { useParams } from 'react-router-dom';
import ErrorPopupProps from '../componets/refresh_popup';
import RefreshFuntion from '../componets/refresh';
import BooleanSlider from '../componets/Slider';
import '../css/personalPage.css'
import NestedTable from '../componets/nestedTable';
import PersonalPageTable from '../componets/PersonalPageTable';
import DiscordService from '../componets/DiscordSendCall';
interface Detail {
    assigned_to_extra_info: [];
    username: string;
    url: string;
    subject: string;
    due_date: string;
    milestone_slug: string;
    status_extra_info: string;
    user_story_extra_info: string;
    namez: string;
    storysubject: string;
    id: number;
    ref: number;
}

interface NestedTableProps {
  details: Detail[];
}


const UserProfile = () => {
    const { username } = useParams();
    const activeusername = localStorage.getItem('username');
const [didClick, setdidClick] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('taiga-token');
    const isManager = localStorage.getItem('isManager');
    const [tokenInvalid, settokenInvalid] = useState<string | null>(null);
    const [pfp, setPfp] = useState<string>('');
    const [busername, setbio] = useState<string>('');
    const [canWork, setcanWork] = useState<boolean>();
    const id = localStorage.getItem('id');
    const basebio = localStorage.getItem('bio');
    const logo = require('../outSideContent/sordane_publishing_logo_square.jpg')
    let tData;
    const [myTasks, setmyTasks] = useState<Detail[]>([]);

useEffect(() => {  
        const fetchData = async () => {

            console.log(activeusername?.toLocaleLowerCase())
            console.log(username?.toLocaleLowerCase())
            console.log(isManager)
            let thisPageUSer;
            if (isManager == 'Manager' || activeusername?.toLocaleLowerCase() === username?.toLocaleLowerCase()) {
              console.log('logged in')
            }
            else{
              console.log('not logged in')
                navigate('/');
            }
            try {
                console.log('call')
                const response = await axios.get('https://api.taiga.io/api/v1/users?project=1575333', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "x-disable-pagination": 'True'
                  },
                });
                // console.log(response.data)
                response.data.forEach((element: any) => {
                    if(element.username?.toLocaleLowerCase() === username?.toLocaleLowerCase()){
                        console.log(element.bio)
                        if(element.bio){
                        setbio(element.bio);}
                        if(!element.big_photo){
                            setPfp(require('../outSideContent/GenericUserAvatar.png'));
                        }
                        else{
                            setPfp(element.big_photo);
                        }
                    } 
                });
              } catch (err: any) {
                  console.log(err)
                setError('Failed to fetch data');
                if(err?.response?.data?.detail == "Given token not valid for any token type"){
                  settokenInvalid(err.message);
                  // RefreshButton();
                }
              }
              try {
                const response = await axios.get('https://api.taiga.io/api/v1/tasks?project=1575333', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "x-disable-pagination": 'True'
                  },
                });
                setmyTasks(response.data);
              } catch (err: any) {
                console.log(err)
                setError('Failed to fetch data');
                if(err?.response?.data?.detail == "Given token not valid for any token type"){
                  settokenInvalid(err.message);
                  // RefreshButton();
                }
              }

    };

    fetchData()
    if(basebio === 'I am Avalible for Work'){
        setbio('I am Avalible for Work')
        setcanWork(true)
        localStorage.setItem('bio', 'I am Avalible for Work');
        console.log('t',basebio)
    }
        else{
        setbio('I am NOT Avalible for Work')
        setcanWork(false)
        localStorage.setItem('bio', 'I am NOT Avalible for Work');
        console.log('f',basebio)
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
      //Block of text to logout
      localStorage.removeItem('taiga-token');
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('activeUser');
      localStorage.removeItem('isManager');
      localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('bio');
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
    settokenInvalid(null);
  
  };
  const handleSliderChange = async (newValue: any) => {
    console.log('Slider value:', newValue);
            let displayAvalible: React.SetStateAction<string>;
            if(newValue){
                displayAvalible = 'I am Avalible for Work' 
            localStorage.setItem('bio', 'I am Avalible for Work');
            }
            else {
                displayAvalible = 'I am NOT Avalible for Work'
        localStorage.setItem('bio', 'I am NOT Avalible for Work');
    }
    let data = JSON.stringify({
        "bio": displayAvalible
      });
      console.log(data)
      let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `https://api.taiga.io/api/v1/users/${id}` ,
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      // axios.request(config)
      // .then((response: { data: any; }) => {
      //   console.log(JSON.stringify(response.data));
      //   setbio(displayAvalible)
      // })
      // .catch((error: any) => {
      //   console.log(error);
      // });
  };
  function sendGoingOnVacation(p0: number): React.MouseEventHandler<HTMLButtonElement> | undefined {

      setdidClick(false)
    console.log(activeusername)
    let data = `${activeusername} is not open to work right now. <@262650022166921227>, <@640180711457816607>, <@271061294096973826>`
    DiscordService(data)
    return
  }
  
  function sendBAckFromVacation(p0: number): React.MouseEventHandler<HTMLButtonElement> | undefined {

      setdidClick(false)
    console.log(activeusername)
    let data = `${activeusername} is open work right now. <@262650022166921227>, <@640180711457816607>, <@271061294096973826>`
    DiscordService(data)
    return
  }
  return (
    <div style={{height: '100%'}}>
              {tokenInvalid && (
        <ErrorPopupProps message={tokenInvalid}  onYes={handleYes}
        onNo={handleNo}/> 
      )}
      <div style={{width: '100%', height: '3%', paddingTop: '1%'}}><div style={{marginRight: '10px'}}><LogoutButton /></div></div>
        <div className='leftside'>
        <div><img style={{marginTop: '30%'}} alt="users profile picture" src={pfp}/></div>
      {/* <div style={{textAlign: 'center'}}>{bio}</div> */}
      {/* <BooleanSlider initialChecked={canWork} onChange={handleSliderChange} /> */}
      <div style={{display: "block ruby"}}>
      <button className="button-29" onClick={() => {sendGoingOnVacation(1)}}>Message Going on Vacation</button>
      <button className="button-29" onClick={() => {sendBAckFromVacation(1)}}>Message I'm Back From Vacation</button>
      </div>
        </div>
        <div className='rightSide'>
            <PersonalPageTable myTasks={myTasks} username={username} />
        </div>
    </div>
  );
};

export default UserProfile;



