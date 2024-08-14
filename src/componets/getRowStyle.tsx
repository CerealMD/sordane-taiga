
  import React from 'react';
  import axios from 'axios'
  
  const getRowStyle = (status: string) => {
    // console.log(status)
    if (status){
    const today = new Date();
    
    // Create a Date object for the given date
    const givenDateObj = new Date(status);
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = givenDateObj.getTime() - today.getTime();
  
    // Convert the difference to different units
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;
    // let report = {
    //   "today": today,
    //   "given": status, 
    //   "datefromfiven": givenDateObj,
    //   "differenceInMilliseconds": differenceInMilliseconds,
    //   "differenceInSeconds": differenceInSeconds,
    //   "differenceInMinutes": differenceInMinutes,
    //   "differenceInHours": differenceInHours,
    //   "differenceInDays": differenceInDays
    // }
    // console.log('report:', report)
    // console.log('differenceInDays:', differenceInHours)
  if(differenceInDays >= 3){
    return 'notDueSoon';
  }
  else if (differenceInDays>1&& differenceInDays<3){
    return 'DueSoon';
  }
  else if (differenceInDays>0&& differenceInDays<1){
    return 'Due';
  }
  else{
    return 'late'
  }
    }
    
  };
    
  
  
  export default getRowStyle;
  