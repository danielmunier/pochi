const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Twitter = require("twitter");
require("dotenv").config();
const fs = require("fs");

const tweetClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

function checkUserExists(username) {
  return new Promise((resolve, reject) => {
    tweetClient.get(
      "users/show",
      {
        screen_name: username,
      },
      (err, data, response) => {
        if (err) {
          console.error(err);
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}

function readUsersChannel() {
  try {
    const data = JSON.parse(
      fs.readFileSync("./config/usersChannel.json", "utf8")
    );

    return data.guilds || [];
  } catch (error) {
    console.error("Erro ao ler o arquivo usersChannel.json:", error);
    return {};
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("twitter")
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Adicionar ou remover usuário")
        .setRequired(true)
        .addChoices(
          {
            name: "adicionar",
            value: "add",
          },
          {
            name: "remover",
            value: "remove",
          },
          {
            name: "listar",
            value: "list",
          }
        )
    )

    .addStringOption((option) =>
      option.setName("user").setDescription("user").setRequired(false)
    )
    .setDescription("Acompanhar um perfil do Twitter"),
  async execute(interaction) {
    let action = await interaction.options.getString("action");
    let user = await interaction.options.getString("user");

    switch (action) {
      case "add":
        // Pegar o user de um usuario do Twitter
        let user = await interaction.options.getString("user");
        console.log(typeof user);

        const exists = await checkUserExists(user);

        if (exists) {
          // Pega o objeto com a lista de usuários e canais
          let usersChannels = JSON.parse(
            fs.readFileSync("./config/usersChannel.json/", "utf8")
          );
          // Pegar o ID do canal que o usuário do Discord executou o comanado
          let guildId = interaction.guildId;
          let guildFound = false;
          for (guild of usersChannels.guilds) {
            if (guild.id === guildId) {
              guild.users[user] = interaction.channelId;
              guildFound = true;
              break;
            }
          }

          if (!guildFound) {
            usersChannels.guilds.push({
              id: interaction.guild.id,
              name: interaction.guild.name,
              users: {
                [user]: interaction.channelId,
              },
            });
          }

          // Adicionar o nome do usuário e o ID do canal ao objeto usersChannels
          /*
           */

          // Salvar as alterações no arquivo JSON
          fs.writeFileSync(
            "./config/usersChannel.json/",
            JSON.stringify(usersChannels)
          );
          interaction.reply({
            content: "Usuário adicionado com sucesso",
            ephemeral: true,
          });
          break;
        }
      case "list":
        let usersChannels = readUsersChannel();
        if (Object.keys(usersChannels).length > 0) {
          const embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Usuários e Canais Associados");

          usersChannels.forEach((guild) => {
            let channel = interaction.channel;
            if (guild.id === interaction.guildId) {
              for (const [key, value] of Object.entries(guild.users)) {
                embed.addFields({
                  name: key,
                  value: `<#${value}>`,
                  inline: true,
                });
              }
            }
          });

          interaction.reply({
            embeds: [embed],
            ephemeral: true,
          });
        }
        break;

      case "remove":
        let userToRemove = await interaction.options.getString("user");
        console.log(typeof userToRemove);
        let usersChannelList = JSON.parse(
          fs.readFileSync("./config/usersChannel.json/", "utf8")
        );

        let guildId = interaction.guildId;

        for (guild of usersChannelList.guilds) {
          if (guild.id === guildId) {
            if (guild.users.hasOwnProperty(userToRemove)) {
              delete guild.users[userToRemove];
              interaction.reply({
                content: "Usuário removido com sucesso",
                ephemeral: true,
              });
              break;
            }
          }
        }

        fs.writeFileSync(
          "./config/usersChannel.json/",
          JSON.stringify(usersChannelList)
        );
        break;
    }
  },
};
