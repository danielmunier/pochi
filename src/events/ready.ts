import { Client, Events } from "discord.js";
import { BotEvent } from "../types";
import logger from "../util/beautyLog";
const { joinVoiceChannel } = require('@discordjs/voice');

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    active: true,
    execute: async (client: Client) => {
           logger.info("Pochi is ready!")
           const user = await client.users.fetch("324719520482721792")


           

    
    }
}


export default event;