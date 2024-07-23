import { Client, Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import { certifyGuildConfig } from "../../utils/guildUtils";
const GuildConfig = require("../../database/schemas/guildSchema");

const event: BotEvent = {
    name: Events.MessageCreate,
    once: true,
    active: true,
    execute: async (message: Message,) => {
        return
        if (message.author.bot) return;
        // Log de mensagem recebida
        console.log(`Mensagem recebida no servidor ${message.guild?.name || 'DM'}:`);
        console.log(`Usuário: ${message.author.tag}`);
        console.log(`Conteúdo: ${message.content}`);
    
           

    
    }
}


module.exports = event