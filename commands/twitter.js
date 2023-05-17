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
      tweetClient.get('users/show', { screen_name: username }, (err, data, response) => {
        if (err) {
          console.error(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }


module.exports = {
  data: new SlashCommandBuilder()
    .setName("twitter")
    .addStringOption((option) =>
    option
      .setName("action")
      .setDescription("Adicionar ou remover usuário")
      .setRequired(true)
      .addChoices({name: "adicionar", value: "add"},
                  {name: "remover", value: "remove"},
                  {name: "listar", value: "list"}
                  )
      )
    
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("user")
        .setRequired(false)
    )
    .setDescription("Acompanhar um perfil do Twitter"),
  async execute(interaction) {
    let action = await interaction.options.getString('action')
    let user = await interaction.options.getString('user')

   if(action === "add") {

     // Pegar o user de um usuario do Twitter
     let user = await interaction.options.getString('user')
     console.log(typeof(user))
 
     const exists = await checkUserExists(user);
 
     if (exists) {
         let usersChannels = {};
         // Pegar o ID do canal que o usuário do Discord executou o comanado
         const channelId = interaction.channelId;
 
 
         try {
             usersChannels = JSON.parse(fs.readFileSync('usersChannel.json', 'utf8'));
           } catch (error) {
             console.error('Erro ao ler o arquivo usersChannel.json:', error);
           }
 
         // Adicionar o nome do usuário e o ID do canal ao objeto usersChannels
         usersChannels[user] = channelId;
 
  // Salvar as alterações no arquivo JSON
         try {
             fs.writeFileSync('usersChannel.json', JSON.stringify(usersChannels));
             interaction.reply({ content: `O usuário ${user} foi cadastrado com sucesso.`, ephemeral: false });
             console.log(`Usuário ${user} cadastrado com sucesso.`);
           } catch (error) {
             interaction.reply({ content: `O usuário ${user} não foi cadastrado.`, ephemeral: true });
             console.error('Erro ao salvar as alterações no arquivo usersChannel.json:', error);
           }
 
 
       } else {
         interaction.reply({ content: `O usuário ${user} não existe.`, ephemeral: false });
       }
 
 


   }else{
    let usersChannels = {};

    try {
      usersChannels = JSON.parse(fs.readFileSync("usersChannel.json", "utf8"));
    } catch (error) {
      console.error("Erro ao ler o arquivo usersChannel.json:", error);
    }

    if (usersChannels.hasOwnProperty(user)) {
      delete usersChannels[user];

      try {
        fs.writeFileSync("usersChannel.json", JSON.stringify(usersChannels));
        interaction.reply({ content: `O usuário ${user} foi removido com sucesso.`, ephemeral: false });
        console.log(`Usuário ${user} removido com sucesso.`);
      } catch (error) {
        interaction.reply({ content: `O usuário ${user} não foi removido.`, ephemeral: true });
        console.error("Erro ao salvar as alterações no arquivo usersChannel.json:", error);
      }
    } else if (action === "remove") {
      interaction.reply({ content: `O usuário ${user} não está cadastrado.`, ephemeral:true})
   } else if (action === "list") {
    
    let usersChannels = {};

    try {
      usersChannels = JSON.parse(fs.readFileSync("usersChannel.json", "utf8"));
    } catch (error) {
      console.error("Erro ao ler o arquivo usersChannel.json:", error);
    }
    
    if (Object.keys(usersChannels).length > 0) {
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Usuários e Canais Associados");
    
      for (const user in usersChannels) {
        const channelId = usersChannels[user];
        const channel = interaction.guild.channels.cache.get(channelId);
    
        if (channel) {
          embed.addFields({
            name: user,
            value: channel.toString(),
            inline: true,
          });
        }
      }
    
      interaction.reply({ embeds: [embed], ephemeral: false });
    } else {
      interaction.reply("Não há usuários cadastrados neste servidor.");
    }
    



   } else {
        interaction.reply({ content: `Comando inexistente.`, ephemeral:true})
   }

   }
  }
};
