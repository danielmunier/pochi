import { Client, Events, InteractionCollector } from "discord.js";
import { BotEvent } from "../types";
import logger from "../util/beautyLog";
const { joinVoiceChannel } = require('@discordjs/voice');

const event: BotEvent = {
    name: Events.InteractionCreate,
    once: false,
    active: true,
    execute: async (interaction) => {
        // Lida com os eventos relacionado a interação com Menus, como Menu de ticket
           if(interaction.isStringSelectMenu()) {
            console.log("Um menu está sendo selecionado")
            const selected = interaction.values
            console.log(selected)


           }


           

    
    }
}


export default event;