
const { EmbedBuilder } = require('discord.js')


async function post_channel(client, channel_id, data, guild) {
    const embed = new EmbedBuilder()
    .setAuthor({ name: data.user.username, iconURL: data.user.iconURL, url: data.post.post_link})
    .setDescription(data.post.description)
    .setColor('FF8000')
    
    embed.setImage(data.post.thumbnail_src)
    const channel = guild.channels.cache.get(channel_id)
    channel.send({embeds: [embed]})
}


module.exports = {
    post_channel
}