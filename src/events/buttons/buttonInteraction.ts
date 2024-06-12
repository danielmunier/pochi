import { ActionRowBuilder, Client, Events, InteractionCollector, ModalBuilder, TextChannel, TextInputBuilder, TextInputStyle } from "discord.js";
import { BotEvent } from "../../types";
import logger from "../../util/beautyLog";
import { createTicketChannel, closeTicketChannel } from "../../util/tickets";

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    active: true,
    execute: async (interaction) => {
        try {
            if(!interaction.isButton()|| !interaction.customId) return

        if(interaction.customId === "create-ticket"){
            const ticket = await createTicketChannel(interaction.guild, interaction.user)

            interaction.reply({content: `Ticket criado com sucesso! <#${ticket?.channel.id}>`, ephemeral: true})
        } 
        
        if(interaction.customId === "close-ticket") {
           await closeTicketChannel(interaction.channel as TextChannel)
          
        }   

        if(interaction.customId === "enter-guild") {
            // TO-DO
        }
        } catch(e) {
            console.log(e)
        }
    }
}


module.exports = event