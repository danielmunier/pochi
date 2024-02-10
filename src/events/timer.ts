import { BotEvent } from "../types";
import { config } from "../config";
import { Client } from "discord.js";
import {timeRemaining, sendToChannel} from "../functions/timer"
const cron = require('node-cron')



  

const event: BotEvent = {
    name: "ready",
    once: false,
    active: true,
    execute: async (client: Client) => {
     try { 
 
               
        cron.schedule("0 10 * * *", async () => {
        const date = await timeRemaining("02/27/2024")
        const content = `Tempo restante: ${date.days} dias, ${date.hours} hora, ${date.minutes} minutos e ${date.seconds} segundos <@324719520482721792> <@587077268644429825>`
        await sendToChannel(client, config.DISCORD_JOB_CHANNEL, config.DISCORD_GUILD_ID, content)
        
        })


     } catch(e) {
        console.error(e)
     }
    }
}

export default event