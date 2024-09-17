import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../componets/logoutbutton';
import RedirectButton from '../componets/redirect';
import ReloadScreen from '../componets/reloadScreen';
import LoginContainer from '../componets/loginContainer';
import LoginContainerMobile from '../componets/loginContainerMobile';
import ReloadScreenMobile from '../componets/reloadScreenMobile';

const Login: React.FC = () => {
  // localStorage.setItem('darkModeActive', 'false');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('taiga-token');
  const activeUser = localStorage.getItem('activeUser');
  // console.log(token)
  // console.log(activeUser)
  let loginOptions;
  let loginOptionsMobile;
  if(!token || !activeUser){
    loginOptions = <LoginContainer/>
    loginOptionsMobile = <LoginContainerMobile/>
  } 
  else 
  {      
   loginOptions = <ReloadScreen/>
   loginOptionsMobile = <ReloadScreenMobile/>
  }

  return (<div style={{height: '100%'}}>
    <div className='desktop-only'>
      {loginOptions}
    </div>
    <div className='mobile-only'>
    {loginOptionsMobile}
  </div>
  </div>
  );
};

export default Login;


