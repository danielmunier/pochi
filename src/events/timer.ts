import { BotEvent } from "../types";
import { sendToChannel } from "../functions/discord";
import { config } from "../config";
import { Client, EmbedBuilder, WebhookClient } from "discord.js";
import {timeRemaining} from "../functions/timer"
const cron = require('node-cron')

const event: BotEvent = {
    name: "ready",
    once: false,
    active: true,
    execute: async (client: Client) => {
     try {

       
     
               
        cron.schedule({hour: 9, minute: 0}, async () => {
        const date = await timeRemaining("02/27/2024")
        const content = `Tempo restante: ${date.days} dias, ${date.hours} horas, ${date.minutes} minutos e ${date.seconds} segundos <@324719520482721792>`
        await sendToChannel(client, config.DISCORD_JOB_CHANNEL, config.DISCORD_GUILD_ID, content)
        
        })


     } catch(e) {
        console.log(e)
     }
    }
}

export default event