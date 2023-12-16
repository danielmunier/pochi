import { Interaction } from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
    name: "interactionCreate",
    once: false,
    execute: (interaction: Interaction) => {
        if(interaction.isCommand()) {

        }
    }
}


export default event;