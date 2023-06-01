const { SlashCommandBuilder, EmbedBuilder, Client} = require("discord.js");
const request = require("request");
require('dotenv').config()
// Esse comando irá retornar uma imagem de gatinho aleatória



module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Imagem de gatinhos"),
  async execute(interaction) {
    console.log(Client)
    console.log(Client.guilds.fetch(interaction.channelId))
    
  }
};
