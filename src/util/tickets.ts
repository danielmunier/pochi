import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Guild, TextChannel, User } from "discord.js";
import logger from "./beautyLog";




async function createTicketChannel(guild: Guild, user: User) {
    try {

        
        const ticketChannel = guild.channels.cache.find(c => c.name === `ticket-${user.username}`)
        if (ticketChannel) return {
            channel: ticketChannel
        }

        logger.info(`Creating ticket channel for ${user.username}`)

        const channel = await guild.channels.create({
            name: `ticket-${user.username}`,
            type: ChannelType.GuildText,
            parent: guild.channels.cache.find(c => c.name === 'tickets')?.id,
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ['ViewChannel', 'SendMessages']
                },
                {
                    id: guild.roles.everyone,
                    deny: ['ViewChannel']
                }
            ]})
            
            const closeButton = new ButtonBuilder()
            .setCustomId("close-ticket")
            .setLabel("Fechar ticket")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("\u{1F4E2}")


            const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(closeButton)
         
            channel.send({content: `Olá ${user}, seja bem vindo ao seu ticket. Para fechar o ticket, basta clicar no botão abaixo.`, components: [row]})

        return {
          channel
        }
    }   catch(e)  {
        logger.error(`${e}`)
    }


    
}


async function closeTicketChannel(channel: TextChannel) {
    try {
        const deleted_channel = await channel.delete("Ticket finalizado")
        return {
            channel: deleted_channel
        }
    } catch(e) {
        logger.error(`${e}`)
    }
}


export { createTicketChannel, closeTicketChannel }