const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const request = require("request");

// Rastreamento de pacotes internacionais/nacionais

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rastrear")
    .addNumberOption((option) =>
      option
        .setName("code")
        .setDescription("Codigo de rastreio")
        .setRequired(true)
    )
    .setDescription("Rastrear encomenda internacional ou nacional"),
  async execute(interaction) {
    let code = interaction.options.getNumber("code");

    interaction.reply({ content: String(code) });
  },
};
