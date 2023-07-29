const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const request = require("request")

// Esse comando limpa mensagens do canal do Discord

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rastreio')
    .addNumberOption(option =>
		option.setName('rastreio_code')
			.setDescription('Número de mensagens apagadas')
			.setRequired(true)
			)
    .setDescription("Rastreare encomenda"),
    async execute(interaction) {




}
}

