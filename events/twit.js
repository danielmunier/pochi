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

/* 
const profiles = require('../profiles.json').profiles */
/* const params = { screen_name: 'choquei', count: 1, tweet_mode: 'extended' }; */
const usersChannels = {
  PBEBrasil: "1063127715466711040",
  WildRiftBR: "1063130867905593345",
  RuneterraBrasil: "1063138338216882257",
  TFTBrasil: "1063138624478126110",
  VALORANTBrasil: "1063144964839710802",
  BRGenshinImpact: "1063148179257831536",
  craftminePortal: "1062365380171018301",
  Terraria_Logic: "1068102446083227648",
  Brawlhalla: "1062407905552367707",
  choquei: "1066937247670206586",
};

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    /*   tweetClient.get('statuses/user_timeline', params, function(error, tweet, response) {
      if (!error) {
          const tweetUrl = `https://twitter.com/choquei/status/${tweet[0].id_str}`;
          console.log(tweetUrl);
      }else {
          console.log('Deu ruim')
          console.log(error)
      }
      });
       */

    setInterval(() => {
      Object.entries(usersChannels).forEach(([user, channelId]) => {
        tweetClient.get(
          "statuses/user_timeline",
          { screen_name: user },
          (error, tweets, response) => {
            let lastTweetIds = {};
            try {
              lastTweetIds = JSON.parse(fs.readFileSync("lastTweetIds.json"));
            } catch (error) {
              console.log("Erro ao ler o arquivo de IDs: ", error);
            }

            if (tweets[0].id_str) {
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
              console.log(`${tweets[0].id_str} não encontrado`);
              console.log(tweets[0]);
              console.log(tweets);
            }
          }
        );
      });
    }, 200000);

    // Em qual canal será enviado o tweet conforme o perfil
  },
};
