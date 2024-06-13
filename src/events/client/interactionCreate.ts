import { Client, Events } from "discord.js";
import { BotEvent } from "../../types";

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    active: true,
    execute: async (interaction, client: Client) => {
        if (!interaction.isCommand()) return;
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Houve um erro ao executar esse comando!',
                ephemeral: true,
            });
        }

           

    
    }
}


module.exports = event