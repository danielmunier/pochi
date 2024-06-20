import { Client, Events } from "discord.js";
import { BotEvent } from "../../types";
const GuildConfig = require("../../database/schemas/guildSchema");

const event: BotEvent = {
    name: Events.GuildCreate,
    once: true,
    active: true,
    execute: async (guild) => {
        console.log("Entrou em uma guilda")
        
        try {
            let existingConfig = await GuildConfig.findOne({ guildId: guild.id });
    
            if (!existingConfig) {
                const novaConfiguracao = new GuildConfig({
                    guildId: guild.id,
                    statusRole: {
                        roleId: 'ID_DO_CARGO_INICIAL',
                        warnChannelId: 'ID_DO_CANAL_DE_AVISO'
                    },
                    ticketConfig: {
                        ticketCategoryId: 'ID_DA_CATEGORIA_DE_TICKETS'
                    },
                    lobby_image: 'URL_DA_IMAGEM_DO_LOBBY',
                    sheetdb: {
                        url: 'URL_DA_API_DO_SHEETDB'
                    }
                });
    
                await novaConfiguracao.save();
                console.log(`Configuração inicial criada para a guilda ${guild.name}`);
            }
        } catch (error) {
            console.error('Erro ao criar configuração para nova guilda:', error);
        }
    
           

    
    }
}


module.exports = event