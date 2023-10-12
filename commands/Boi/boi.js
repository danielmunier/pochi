const {
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios");
const request = require("request");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("boi")
    .setDescription("Veja o tamanho do seu chifre!"),
  async execute(interaction) {
    const size_of_horn =  Math.floor(Math.random() * 50) + 1; 
    console.log(guild)
    const boi_embed = new EmbedBuilder()
      .setDescription(
        `Analisando a curvatura e aerodinâmica do seu crânio... O tamanho do seu chifre é de ${size_of_horn} cm`
      )
      .setColor("FE6D24");


   if(size_of_horn === 0 ) {
    boi_embed.setDescription(`Analisando a curvatura e aerodinâmica do seu crânio... O tamanho do seu chifre é de ${size_of_horn} cm. Você não tem chifre!`)
    .setImage("https://i.imgur.com/C0BAw4P.png")
   }

   else if(size_of_horn >= 1 && size_of_horn < 20) {
    boi_embed.setDescription(`Analisando a curvatura e aerodinâmica do seu crânio... O tamanho do seu chifre é de ${size_of_horn} cm. Seu chifre está crescendo! Você é um chifrudinho >.<`)
    .setImage("https://i.imgur.com/tzZHHZj.png")
   }

   else if(size_of_horn >= 20 && size_of_horn <= 30) {
    boi_embed.setDescription(`Analisando a curvatura e aerodinâmica do seu crânio... O tamanho do seu chifre é de ${size_of_horn} cm. Você é bem chifrudo hein!`)
    .setImage("https://i.imgur.com/CS8pFHL.jpg")
   } 
   else if (size_of_horn >= 30 && size_of_horn <= 40) {
    boi_embed.setDescription(`Analisando a curvatura e aerodinâmica do seu crânio... O tamanho do seu chifre é de ${size_of_horn} cm. Seu chifre bate no teto! `)
    .setImage("https://i.imgur.com/WO3YRkt.jpg")
   }
   else if(size_of_horn >= 40 && size_of_horn <= 50) {
    boi_embed.setDescription(`Analisando a curvatura e aerodinâmica do seu crânio... O tamanho do seu chifre é de ${size_of_horn} cm. Você é um chifrudo de respeito! `)
    .setImage("https://i.imgur.com/uvdQ0E4.png")
   }


    interaction.reply({ embeds: [boi_embed] });

  },
};
