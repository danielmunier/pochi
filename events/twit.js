require("dotenv").config();
const Twitter = require("twitter");
const fs = require("fs");

const { Events, EmbedBuilder } = require("discord.js");

const tweetClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

const usersChannel = JSON.parse(fs.readFileSync("usersChannel.json", "utf8"));

/* 
Object.entries(usersChannel).forEach(([user, channelId]) => {

 })
 */


module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    
    setInterval(() => {
      // Le o arquivo com os usuários e canais
      const usersChannel = JSON.parse(fs.readFileSync("usersChannel.json", "utf8"));

      // Para cada usuário no objeto usersChannel
      Object.entries(usersChannel).forEach(([user, channelId]) => {
        tweetClient.get(
          "statuses/user_timeline",
          { screen_name: user,
            exclude_replies: true, 
          },
          
          (error, tweets, response) => {
            console.log(`É a vez do ${user}:`);
            let lastTweetIds = {};
            try {
              lastTweetIds = JSON.parse(fs.readFileSync("lastTweetIds.json"));
            } catch (error) {
              console.log("Erro ao ler o arquivo de IDs: ", error);
            }

            if (Array.isArray(tweets) && tweets.length > 0 && tweets[0].id_str) {
              if (lastTweetIds[tweets[0].id_str] !== tweets[0].id_str) {
                // Atualiza o ID do último tweet enviado para o perfil
                lastTweetIds[tweets[0].id_str] = tweets[0].id_str;
                // Salva o arquivo com os novos IDs
                fs.writeFileSync(
                  "lastTweetIds.json",
                  JSON.stringify(lastTweetIds)
                );

                if (!error) {
                  const tweet = tweets[0];

                  console.log(`É a vez do ${user}:`);
                  console.log(
                    `https://twitter.com/${user}/status/${tweet.id_str}`
                  );
                  const channel = client.channels.cache.get(channelId); // Aqui pega o canal associado ao usuário no objeto channels

                  channel.send({
                    content: `https://twitter.com/${user}/status/${tweet.id_str}`,
                  });
                }
              } else {
                console.log("Enviado anteriormente");
              }
            } else {
              console.log(tweets[0]);
              console.log(tweets);
            }
          }
        );
      });
    }, 10000 ); // 960000 = 16 minutos

    // Em qual canal será enviado o tweet conforme o perfil
  },
};
