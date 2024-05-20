"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInstagramToChannel = void 0;
const discord_js_1 = require("discord.js");
async function sendInstagramToChannel(client, channelId, postData, guildId) {
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        throw new Error("Guild not found");
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setTimestamp()
        .setAuthor({
        name: postData.owner.username,
        iconURL: postData.owner.profileIconURL,
        url: postData.url,
    })
        .setDescription(postData.description);
    embed.setImage(postData.thumbnail);
    const channel = guild.channels.cache.get(channelId);
    if (!channel) {
        throw new Error("Channel not found");
    }
    channel.send({ embeds: [embed] });
}
exports.sendInstagramToChannel = sendInstagramToChannel;
