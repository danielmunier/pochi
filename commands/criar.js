const { SlashCommandBuilder, ActionRowBuilder, ChannelType, PermissionFlagsBits } = require('discord.js')

// Retorna informações sobre o servidor que está presente

module.exports = {
    data: new SlashCommandBuilder()
    .setName('criar')
    .setDescription('Provides information about the server'),

    
    async execute(interaction) {
        const channel = interaction.guild.channels.create({
            name:` ${interaction.user.username}}`,
            type: ChannelType.GuildText,
            permissionsOverwrites: [

                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.user.id,
                    allow: [
                        'VIEW_CHANNEL',
                        'SEND_MESSAGES',
                        'ADD_REACTIONS',
                       
                        ]
                },
              
            ]
        }).then((chat) => {
           chat.send({content: `Ticket criado!`, ephemeral: true})

        })
    }
}