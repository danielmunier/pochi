const { Client, Events } = require("discord.js")


module.exports = {
    name: Events.InteractionCreate,
	on: true,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
	if (!interaction.isChatInputCommand()) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	}
    
}
