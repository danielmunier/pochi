const { Client, Collection, Events, GatewayIntentBits, Intents, Partials } = require('discord.js');
require("dotenv").config()
/* Loading command files */

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent],
	partials: [
	  Partials.Channel,
	  Partials.Message
	] });

	module.exports = client;
	require("./handler")(client);



// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);



