const { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client } = require('discord.js');
const Twitter = require('twitter');
const fs = require('fs');

const tweetClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

function readUsersChannel() {
  try {
    const data = JSON.parse(fs.readFileSync("./config/usersChannel.json", "utf8"));
    return data.guilds || [];
  } catch (error) {
    console.error("Erro ao ler o arquivo usersChannel.json:", error);
    return [];
  }
}

function readLastTweetIds() {
  try {
    const lastTweetIds = JSON.parse(fs.readFileSync('./config/lastTweetIds.json', 'utf8'));
    return lastTweetIds;
  } catch (error) {
    console.log('Erro ao ler o arquivo de IDs: ', error);
    return {}
  }
}

function writeLastTweetIds(lastTweetIds) {
  fs.writeFileSync('./config/lastTweetIds.json', JSON.stringify(lastTweetIds));
}

function sendTweetToChannel(user, tweet, channelId, interaction) {

  try{
    const guild = interaction.guild
    const tweetUrl = `https://twitter.com/${user}/status/${tweet.id_str}`;
    const channel = interaction.client.channels.cache.get(channelId);
  
        if (guild.members.me.permissionsIn(channel).toArray().includes("SendMessages") && guild.members.me.permissionsIn(channel).toArray().includes("ViewChannel")) {

          console.log('Eu posso enviar mensagens em ' + channel.name + '!')
          channel.send({content: tweetUrl})
          
      }else {
        console.log(`Sem permissão em ${channel.name}`)
      }
  }catch(err) {
    console.log(`Erro: ${err}`)
  }
  
}
module.exports = {
  data: new SlashCommandBuilder()
    .setName('consultar')
    .setDescription('Força a consulta ao Twitter e envia os tweets para os canais configurados'),
  async execute(interaction) {

      // Soon
   
  },
};
