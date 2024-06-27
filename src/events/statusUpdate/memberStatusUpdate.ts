import { GuildMember, TextChannel } from "discord.js";
import { BotEvent } from "../../types";
import logger from "../../utils/beautyLog";
import { certifyGuildConfig } from "../../utils/guildUtils";
import { ICustomStatusRole, CustomStatusRole } from "../../database/schemas/customStatusSchema";

// Helper function to check if the custom status contains the specific terms
const containsInStatus = (status: string | null | undefined, terms: string[]): boolean => {
    return terms.some(term => status?.includes(term));  
};

// Main event handler
const event: BotEvent = {
    name: "presenceUpdate",
    once: false,
    active: true,
    execute: async (oldPresence, newPresence) => {
        try {
            // Ignore updates from bots
            if (newPresence.user.bot) {
                return;
            }

            const guildData = await certifyGuildConfig(newPresence.guild);
            if (!guildData) {
                logger.error("Guilda não cadastrada, aguarde um momento");
                return;
            }

            const GUILD_ID = guildData.guildId;
            const customStatusData = await CustomStatusRole.find({ guildId: GUILD_ID }).exec();

            customStatusData.forEach(async (customStatus: ICustomStatusRole) => {
                const { statusTerms, roleIds, warnChannelId } = customStatus;

                const member = newPresence.member as GuildMember;
                if (!member || !member.presence) return;

                const newCustomStatus = member.presence.activities.find(activity => activity.name === "Custom Status")?.state;

                roleIds.forEach(async (roleId: string) => {
                    if (containsInStatus(newCustomStatus, statusTerms)) {
                        if (!member.roles.cache.has(roleId)) {
                            await member.roles.add(roleId);
                            if (warnChannelId) {
                                const warnChannel = member.guild.channels.cache.get(warnChannelId) as TextChannel;
                                if (warnChannel) {
                                    warnChannel.send(`<@${member.id}> mudou seu status personalizado para "${newCustomStatus}"`);
                                }
                            }
                            logger.info(`Cargo adicionado a ${member.displayName} pelo status personalizado: ${newCustomStatus}`);
                        }
                    } else {
                        if (member.roles.cache.has(roleId)) {
                            await member.roles.remove(roleId);
                            if (warnChannelId) {
                                const warnChannel = member.guild.channels.cache.get(warnChannelId) as TextChannel;
                                if (warnChannel) {
                                    warnChannel.send(`<@${member.id}> mudou seu status personalizado para "${newCustomStatus}"`);
                                }
                            }
                            logger.info(`Cargo removido de ${member.displayName} pelo status personalizado: ${newCustomStatus}`);
                        }
                    }
                });
            });
        } catch (error) {
            logger.error(`Erro ao processar evento PresenceUpdate: ${error}`);
        }
    }
};

module.exports = event;
