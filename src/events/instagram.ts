import { Client } from "discord.js";
import { BotEvent, instagramPost } from "../types";
import { getLatestPost } from "../functions/instagram";
import { sendInstagramToChannel } from "../functions/discord";
import { config } from "../config";
import { findPost, storePost } from "../database/functions/Post";



const event: BotEvent = {
  name: "ready",
  once: false,
  active: false,
  execute: async (client: Client) => {
    try {
    await getLatestPost("querovagas23").then(async (data: instagramPost) => {
         await findPost(data).then((result: boolean) => {
  
          if(!result) {
            storePost(data);
            sendInstagramToChannel(client, config.DISCORD_JOB_CHANNEL, data, config.DISCORD_GUILD_ID); // client, channelId, data, guildId
          } 
  
        })
        })
  
      
  
      setInterval(() => {
      getLatestPost("querovagas23").then((data: instagramPost) => {
          findPost(data).then((result: boolean) => {
  
            if(!result) {
              storePost(data);
              sendInstagramToChannel(client, config.DISCORD_JOB_CHANNEL, data, config.DISCORD_GUILD_ID); // client, channelId, data, guildId
            } 
    
          })
        });
      }, 1200000);

    }catch(e) {
      console.log(e)

    }
    
    
  },
};

export default event;
