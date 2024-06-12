import { Client, Events } from "discord.js";
import { BotEvent } from "../../types";
import logger from "../../util/beautyLog";
const { joinVoiceChannel } = require('@discordjs/voice');

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    active: true,
    execute: async (client: Client) => {
        // client.guilds.cache.forEach(guild => {
        //     logger.info(`${guild.name} | ${guild.id}`);
        //     })
           logger.info("Pochi is ready!")


           

    
    }
}


module.exports = event