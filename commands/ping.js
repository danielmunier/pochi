const { SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

// Teste de ping

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Replies with Pong!"),
    async execute(interaction) {
    	/* await interaction.deferReply();
		await wait(4000); */
        await interaction.reply({content: "Pong!"})
     
    }
}

