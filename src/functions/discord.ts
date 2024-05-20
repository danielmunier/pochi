import { Client, EmbedBuilder, TextChannel } from "discord.js";
import { instagramPost } from "../types";


async function sendInstagramToChannel(client: Client, channelId: string, postData: instagramPost, guildId: string ) {
  const guild = client.guilds.cache.get(guildId);
  if(!guild) {
    throw new Error("Guild not found")
  }
  const embed = new EmbedBuilder()
    .setTimestamp()
    .setAuthor({
      name: postData.owner.username,
      iconURL: postData.owner.profileIconURL,
      url: postData.url,
    })
    .setDescription(postData.description)
    

  embed.setImage(postData.thumbnail);
  const channel = guild.channels.cache.get(channelId) as TextChannel;
  if(!channel) {
    throw new Error("Channel not found")
  }
  channel.send({ embeds: [embed] });
}




export {sendInstagramToChannel}