import { Guild } from "discord.js";
import { GuildConfig, IGuildConfig } from "../database/schemas/guildSchema";
import { CustomStatusRole, ICustomStatusRole } from "../database/schemas/customStatusSchema";
import { FormEntryConfig, IFormEntryConfig } from "../database/schemas/formEntrySchema";
import { TicketConfig, ITicketConfig } from "../database/schemas/ticketConfigSchema";
import { LobbyConfig, ILobbyConfig } from "../database/schemas/lobbyConfigSchema";
import logger from "./beautyLog";

export async function certifyGuildConfig(guild: Guild): Promise<IGuildConfig> {
    try {
        let guildConfig = await GuildConfig.findOne({ guildId: guild.id });

        if (!guildConfig) {
            const customStatusRole = new CustomStatusRole({
                guildId: guild.id,
                statusTerms: [],
                roleIds: [],
                warnChannelId: null
            });
            await customStatusRole.save();

            const formEntryConfig = new FormEntryConfig({
                guildId: guild.id,
                formChannelId: null,
                rolesMemberApproved: [],
                rolesVerification: []
            });
            await formEntryConfig.save();

            const ticketConfig = new TicketConfig({
                guildId: guild.id,
                ticketCategoryId: null
            });
            await ticketConfig.save();

            const lobbyConfig = new LobbyConfig({
                guildId: guild.id,
                lobby_command_image: null
            });
            await lobbyConfig.save();

            guildConfig = new GuildConfig({
                guildId: guild.id,
                customStatusRoles: [customStatusRole._id],
                formEntryConfig: formEntryConfig._id,
                ticketConfig: ticketConfig._id,
                lobbyConfig: lobbyConfig._id,
                sheetdb: {
                    url: null
                }
            });
            await guildConfig.save();

            logger.info(`Pré-configuração criada para a guilda ${guild.name}`);
        }

        return guildConfig;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
