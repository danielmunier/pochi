import { Client, Events } from "discord.js";
import { BotEvent } from "../../types";


const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    active: true,
    execute: async (client: Client) => {
         
    console.log('Pochi está ligado!')

           

    
    }
}


module.exports = event