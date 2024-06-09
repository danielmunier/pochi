import { Client, Events, InteractionCollector, TextChannel } from "discord.js";
import { BotEvent } from "../types";
import logger from "../util/beautyLog";
import { createTicketChannel, closeTicketChannel } from "../util/tickets";
const { joinVoiceChannel } = require('@discordjs/voice');

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    active: true,
    execute: async (interaction) => {
        if(!interaction.isButton()|| !interaction.customId) return

        if(interaction.customId === "create-ticket"){
            const ticket = await createTicketChannel(interaction.guild, interaction.user)

            interaction.reply({content: `Ticket criado com sucesso! <#${ticket?.channel.id}>`, ephemeral: true})
        } 
        
        if(interaction.customId === "close-ticket") {
           const deleted_ticket = await closeTicketChannel(interaction.channel as TextChannel)
        }
    }
}


export default event;