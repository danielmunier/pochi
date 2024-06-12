import { Events, GuildMember, TextChannel } from "discord.js";
import { BotEvent } from "../../types";
import logger from "../../util/beautyLog";

// Helper function to check if the custom status contains the specific terms
const containsNovaheaven = (status: string | null | undefined): boolean => {
    return (status?.includes("/novaheaven") || status?.includes("discord.gg/novaheaven")) ?? false;
};




// Main event handler
const event: BotEvent = {
    name: Events.PresenceUpdate,
    once: false,
    active: true,
    execute: async (oldPresence, newPresence) => {
        // Ignorar update dos bots
        if (newPresence.bot) return;


        const GUILD_ID = "1209632813792628746";
        const WARN_CHANNEL_ID = "1229905956368941167";
        const ROLE_ID = "1250057595142799391";

        if (newPresence.guild.id !== GUILD_ID) return;

        const member = newPresence.member as GuildMember;

        if (!member || !member.presence) return;

        const newCustomStatus = member.presence.activities.find(activity => activity.name === "Custom Status")?.state;

        const oldCustomStatus = oldPresence?.member?.presence?.activities.find((activity: { name: string; }) => activity.name === "Custom Status")?.state;

        const hasRole = member.roles.cache.has(ROLE_ID);
        const warnChannel = member.guild.channels.cache.get(WARN_CHANNEL_ID) as TextChannel;

        if (containsNovaheaven(newCustomStatus)) {
            if (!hasRole) {
                await member.roles.add(ROLE_ID);
                warnChannel?.send(`<@${member.id}> changed their custom status to ${newCustomStatus}`);
                logger.info(`${newCustomStatus}`);
            }
        } else {
            if (hasRole) {
                await member.roles.remove(ROLE_ID);
                warnChannel?.send(`<@${member.id}> changed their custom status to ${newCustomStatus}`);
                logger.info(`Removed role from ${member.displayName} as they removed /novaheaven from their status.`);
            }
        }
    }
}

module.exports = event
