import {  Client } from "discord.js";
import logger from "../../utils/beautyLog";

module.exports = {
    data: {
        id: "close-ticket"
    },
    async execute(interaction: any, client: Client) {
        try {
            const channel = interaction.channel;
            // Todo:  Add  a  check  to  see  if  the  channel  is  a  ticket  channel
            // Todo: Store logs  of  ticket 
            channel.delete()
            
        }   catch(e)  {
            logger.error(`${e}`)
        }
    
        }
}