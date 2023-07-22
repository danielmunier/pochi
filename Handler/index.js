
const fs = require("node:fs");
const path = require('node:path');
const { Collection } = require('discord.js');

module.exports = async(client) => {
client.commands = new Collection();
client.buttons = new Collection();
/* deployCommands(); */
const commandsPath = path.join(__dirname, '../commands'); // Path commands
const eventsPath = path.join(__dirname, '../events') // Path events

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) // Command Files
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')) // Events files

// Commands
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
	/* 	command.execute = command.execute.bind(null, client) */
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

}


