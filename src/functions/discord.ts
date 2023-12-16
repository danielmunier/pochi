import { Client, EmbedBuilder, TextChannel } from "discord.js";


async function postChannel(client: Client, channelId: string, postData: any, guildId: string ) {
  const guild = client.guilds.cache.get(guildId);
  if(!guild) {
    throw new Error("Guilda não encontrada")
  }
  const embed = new EmbedBuilder()
    .setTimestamp()
    .setAuthor({
      name: postData.user.username,
      iconURL: postData.user.iconURL,
      url: postData.post.post_link,
    })
    .setDescription(postData.post.description)
    

  embed.setImage(postData.post.thumbnail_src);
  const channel = guild.channels.cache.get(channelId) as TextChannel;
  if(!channel) {
    throw new Error("Canal não encontrado")
  }
  channel.send({ embeds: [embed] });
}


export {postChannel}