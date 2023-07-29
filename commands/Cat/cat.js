const { SlashCommandBuilder, EmbedBuilder, Client, PermissionsBitField } = require("discord.js");
const axios = require('axios')
const request = require("request");
require('dotenv').config()
// Esse comando irá retornar uma imagem de gatinho aleatória



module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Imagem de gatinhos"),
  async execute(interaction) {
      const cat_embed = new EmbedBuilder()
      .setColor("Grey")
      .setDescription("Gatinho");

      const guild = interaction.guild
      const channel = interaction.client.channels.cache.get(interaction.channelId)
      axios({
        method: 'get',
        url: 'https://api.thecatapi.com/v1/images/search',
        responseType: 'json'
      })
        .then(function (response) {
          interaction.reply({content: response.data[0].url})

        });
      

        
  }}
