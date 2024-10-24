import { Events } from "discord.js";
import { BotEvent } from "../../types";
import { certifyGuildConfig } from "../../utils/guildUtils";


const event: BotEvent = {
    name: Events.GuildCreate,
    once: true,
    active: true,
    execute: async (guild) => {
        console.log("Entrou em uma guilda")
        
        const existingGuild = await certifyGuildConfig(guild)
    
           

    
    }
}


module.exports = event