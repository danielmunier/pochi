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
    const usersChannel = JSON.parse(fs.readFileSync('./config/usersChannel.json', 'utf8'));
    console.log(usersChannel)
    return usersChannel;
  } catch (error) {
    console.error('Erro ao ler o arquivo usersChannel.json:', error);
    return {};
  }
}

function readLastTweetIds() {
  try {
    const lastTweetIds = JSON.parse(fs.readFileSync('./config/lastTweetIds.json', 'utf8'));
    return lastTweetIds;
  } catch (error) {
    console.log('Erro ao ler o arquivo de IDs: ', error);
    return {};
  }
}

function writeLastTweetIds(lastTweetIds) {
  fs.writeFileSync('./config/lastTweetIds.json', JSON.stringify(lastTweetIds));
}

function sendTweetToChannel(user, tweet, channelId, client) {

  try{
    const tweetUrl = `https://twitter.com/${user}/status/${tweet.id_str}`;
    const channel = client.channels.cache.get(channelId);
    console.log(channel)
  
    if (channel && channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
      channel.send({
        content: tweetUrl,
      });
    } else {
      console.log(`O bot não tem permissões para enviar mensagens no canal ${channelId}`);
    }
  }catch(err) {
    console.log('erro')
  }
  
}
module.exports = {
  data: new SlashCommandBuilder()
    .setName('consultar')
    .setDescription('Força a consulta ao Twitter e envia os tweets para os canais configurados'),
  async execute(interaction) {
    console.log(interaction)
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      interaction.reply({ content: 'Você não tem permissão para usar este comando!', ephemeral: true });
      return;
    }

    const usersChannel = readUsersChannel();
    const lastTweetIds = readLastTweetIds();

    Object.entries(usersChannel).forEach(([user, channelId]) => {
      console.log(`Consultando o ${user}: ${channelId}`)
      tweetClient.get(
        'statuses/user_timeline',
        { screen_name: user, exclude_replies: true },
        (error, tweets, response) => {
          if (Array.isArray(tweets) && tweets.length > 0 && tweets[0].id_str) {
            if (lastTweetIds[tweets[0].id_str] !== tweets[0].id_str) {
              lastTweetIds[tweets[0].id_str] = tweets[0].id_str;
              writeLastTweetIds(lastTweetIds);

              if (!error) {
                const tweet = tweets[0];

               /*  console.log(`É a vez do ${user}:`);
                console.log(`https://twitter.com/${user}/status/${tweet.id_str}`); */

                sendTweetToChannel(user, tweet, channelId, Client);
              }
            } else {
              console.log('Enviado anteriormente');
            }
          } else {
            console.log(tweets);
          }
        }
      );
    });

    await interaction.reply('Tweets enviados para os canais configurados!');
  },
};
