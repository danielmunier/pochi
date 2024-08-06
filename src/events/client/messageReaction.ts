import { Events } from "discord.js";
import { BotEvent } from "../../types";
const GuildConfig = require("../../database/schemas/guildSchema");

const event: BotEvent = {
    name: Events.MessageReactionAdd,
    once: false,
    active: true,
    execute: async (reaction, user) => {
        console.log('Teste')
    
           

    
    }
}


module.exports = event