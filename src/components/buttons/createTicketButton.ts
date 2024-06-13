import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Client, TextChannel } from "discord.js";
import logger from "../../util/beautyLog";

module.exports = {
    data: {
        id: "create-ticket"
    },
    async execute(interaction: any, client: Client) {
        try {

        
            const ticketChannel = interaction.guild.channels.cache.find((c: { name: string; }) => c.name === `ticket-${interaction.user.username}`)
            if (ticketChannel) return {
                channel: ticketChannel
            }
    
            logger.info(`Creating ticket channel for ${interaction.user.username}`)


    
            const channel: TextChannel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: interaction.guild.channels.cache.find((c: { name: string; }) => c.name === 'tickets')?.id,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel', 'SendMessages']
                    },
                    {
                        id: interaction.guild.roles.everyone,
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
             

                

                channel.send({content: `Olá ${interaction.user.username}, seja bem vindo ao seu ticket! Aguarde um administrador responder. Para fechar o ticket, basta clicar no botão abaixo.`, components: [row]})

                interaction.reply({
                    content: `Ticket criado com sucesso! <#${channel.id}>`,
                    ephemural: true
                })
          
        }   catch(e)  {
            logger.error(`${e}`)
        }
    
        }
}