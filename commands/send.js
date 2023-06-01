const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

// Teste de ping

module.exports = {
    data: new SlashCommandBuilder()
    .setName('send')
    .setDescription("Send message!"),
    async execute(interaction) {
    	/* await interaction.deferReply();
		await wait(4000); */
     
    }
}

