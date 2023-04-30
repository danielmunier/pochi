const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

// Retorna informações sobre o servidor que está presente

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Provides information about the server'),

    
    async execute(interaction) {
        await interaction.reply({content: `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.
         ${interaction.user.username}, que entrou no servidor em ${interaction.member.joinedAt} * `, ephemeral: true});
    }
}