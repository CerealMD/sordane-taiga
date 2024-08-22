import axios from 'axios';


async function DiscordService(data: any) {

        console.log(data)
      const body = {
        content: data,
        tts: false,
        color: "white",
        embeds: [
          {
            title: "Contact Form",
            description: data,
          },
        ],
      };
  
      try {
        const data = await axios.post(
          "https://discord.com/api/webhooks/1276190395654737991/zKAS012mJYdjgiCKfVDBN4Mn-4tL44hEXTRrPDA5tE1skRQkXDQ1tThQOE7e_5gDZoY0",
          body
        );
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  

  
  export default DiscordService;