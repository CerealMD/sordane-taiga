
import React from 'react';
import axios from 'axios'

const getRowStyle = (status: string, is_closed:boolean) => {
  // console.log(status)
  // console.log(is_closed)
  if(is_closed){
    return 'closed';
  }
  else if(status === 'true'){
    return 'closed borderRadius25';
  }
  else if(status === 'notDueSoon'){
    return 'notDueSoon borderRadius25';
  }
  else if(status === 'DueSoon'){
    return 'DueSoon borderRadius25';
  }
  else if(status === 'Due'){
    return 'Due borderRadius25';
  }
  else if(status === 'late'){
    return 'late borderRadius25';
  }
  else if (status){
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
  else{
    return ''
  }
  
};
  


export default getRowStyle;
