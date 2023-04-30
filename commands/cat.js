const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const request = require("request");

// Esse comando irá retornar uma imagem de gatinho aleatória

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Imagem de gatinhos"),
  async execute(interaction) {
    fetch(
      `https://api.thecatapi.com/v1/images/search?api_key=${cat[0].MEOW_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const catUrl = data[0].url;

        const embedCat = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle("Gato")
          .setImage(catUrl);

        interaction.reply({
          embeds: [embedCat],
        });
      });
  },
};
