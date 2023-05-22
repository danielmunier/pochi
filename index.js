const { Client, Collection, Events, GatewayIntentBits, Intents } = require('discord.js');
require("dotenv").config()
/* Loading command files */

const fs = require("node:fs");
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.buttons = new Collection();

const commandsPath = path.join(__dirname, 'commands'); // Path commands
const eventsPath = path.join(__dirname, 'events') // Path events

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) // Command Files
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')) // Events files

// Commands
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Events
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}







// Log in to Discord with your client's token
client.login(process.env.TOKEN);
