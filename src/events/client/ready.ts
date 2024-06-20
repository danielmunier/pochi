import { Client, Events } from "discord.js";
import { BotEvent } from "../../types";
import logger from "../../utils/beautyLog";
const GuildConfig = require("../../database/schemas/guildSchema")

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    active: true,
    execute: async (client: Client) => {
         
           logger.info("Pochi is ready!")


           

    
    }
}


module.exports = event