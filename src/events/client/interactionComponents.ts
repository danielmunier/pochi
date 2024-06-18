import { Client, Events, TextChannel } from "discord.js";
import { BotEvent } from "../../types";

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    active: true,
    execute: async (interaction, client: Client) => {
        // Interaction Components
        

        // Buttons
        if (interaction.isButton() && interaction.customId) {
         const { customId } = interaction

           const button = client.buttons.get(customId)
           if(button) button.execute(interaction)

            
        

    
        }

        // Modals
        if (interaction.isModalSubmit()) {
            const { customId } = interaction
            const modal = client.modals.get(customId)
            if(modal) modal.execute(interaction)

    }
}
}

module.exports = event