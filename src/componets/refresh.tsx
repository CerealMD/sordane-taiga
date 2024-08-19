import axios from 'axios'

async function RefreshFuntion() {
  let refresh_token = localStorage.getItem('refresh-token');
    // const axios = require('axios');
    let data = JSON.stringify({
      "refresh": refresh_token
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.taiga.io/api/v1/auth/refresh',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    // console.log(config)
    await axios.request(config)
      .then((response: { data: any; }) => {
        // console.log(JSON.stringify(response.data));
        localStorage.setItem('taiga-token', response.data.auth_token);
        localStorage.setItem('refresh-token', response.data.refresh);
        return;
      })
      .catch((error: any) => {
        console.log(error);
        return;
      });
  

}

export default RefreshFuntion;
