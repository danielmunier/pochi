require("dotenv").config();
const Twitter = require("twitter");
const fs = require("fs");

const { Events } = require("discord.js");

const tweetClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

function readUsersChannel() {
  try {
    const usersChannel = JSON.parse(fs.readFileSync("usersChannel.json", "utf8"));
    return usersChannel;
  } catch (error) {
    console.error("Erro ao ler o arquivo usersChannel.json:", error);
    return {};
  }
}

function readLastTweetIds() {
  try {
    const lastTweetIds = JSON.parse(fs.readFileSync("lastTweetIds.json", "utf8"));
    return lastTweetIds;
  } catch (error) {
    console.log("Erro ao ler o arquivo de IDs: ", error);
    return {};
  }
}

function writeLastTweetIds(lastTweetIds) {
  fs.writeFileSync("lastTweetIds.json", JSON.stringify(lastTweetIds));
}

function sendTweetToChannel(user, tweet, channelId, client) {
  const tweetUrl = `https://twitter.com/${user}/status/${tweet.id_str}`;
  const channel = client.channels.cache.get(channelId);

  channel.send({
    content: tweetUrl,
  });
}

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    setInterval(() => {
      const usersChannel = readUsersChannel();
      const lastTweetIds = readLastTweetIds();

      Object.entries(usersChannel).forEach(([user, channelId]) => {
        tweetClient.get(
          "statuses/user_timeline",
          { screen_name: user, exclude_replies: true },
          (error, tweets, response) => {
            if (Array.isArray(tweets) && tweets.length > 0 && tweets[0].id_str) {
              if (lastTweetIds[tweets[0].id_str] !== tweets[0].id_str) {
                lastTweetIds[tweets[0].id_str] = tweets[0].id_str;
                writeLastTweetIds(lastTweetIds);

                if (!error) {
                  const tweet = tweets[0];

                  console.log(`É a vez do ${user}:`);
                  console.log(`https://twitter.com/${user}/status/${tweet.id_str}`);

                  sendTweetToChannel(user, tweet, channelId, client);
                }
              } else {
                console.log("Enviado anteriormente");
              }
            } else {
              console.log(tweets);
            }
          }
        );
      });
    }, 960000); // 960000 = 16 minutos
  },
};
