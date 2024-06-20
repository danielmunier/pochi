import { Guild } from "discord.js";

const GuildConfig = require("../database/schemas/guildSchema");
const logger = require("./beautyLog");

async function certifyGuildConfig(guild: Guild) {
    try {
        let guildConfig = await GuildConfig.findOne({ guildId: guild.id });

        if (!guildConfig) {
            guildConfig = new GuildConfig({
                guildId: guild.id,
                customStatusRoles: [{
                    statusTerms: [],  // Inicialmente vazio
                    roleIds: [],
                    warnChannelId: null  // Inicialmente vazio
                }],  // Inicialmente vazio
                ticketConfig: {
                    ticketCategoryId: null
                },
                formEntryConfig: {
                    formChannelId: null,
                    rolesMemberApproved: []
                },
                lobbyConfig: {
                    lobby_command_image: null
                },
                sheetdb: {
                    url: null
                }
            });

            await guildConfig.save();
            console.log(`Pré-configuração criada para a guilda ${guild.name}`);

            return guildConfig;
        }

        return guildConfig;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = { certifyGuildConfig };
