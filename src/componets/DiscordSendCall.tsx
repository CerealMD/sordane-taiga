import axios from 'axios';


async function DiscordService(data: any) {
  let dateTime = new Date()
        console.log(data)
      const body = {
        content: data,
        tts: false,
        color: "white",
        embeds: [
          {
            title: "Updated on:",
            description: dateTime,
          },
        ],
      };
  
      try {
        const data = await axios.post(
          "https://discord.com/api/webhooks/1276401274446807074/ty9tVZmgj7DIomZr2GRWZqydmNnC1mo6pGI55yYQIP4Y510w2FAxvrn-nRkxrx_SNYzN",
          body
        );
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  

  
  export default DiscordService;