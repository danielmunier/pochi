import { Client, EmbedBuilder, TextChannel } from "discord.js";

async function sendToChannel(client: Client, channelId: string, guildId: string, content: string ) {
  const guild = client.guilds.cache.get(guildId);
  if(!guild) {
    throw new Error("Guild not found")
  }
  const channel = guild.channels.cache.get(channelId) as TextChannel;
  if(!channel) {
    throw new Error("Channel not found")
  }

  const embed = new EmbedBuilder()
  .setTimestamp()
  .setTitle("3rd Anniversary")
  .setAuthor({
    name: "Rimuru",
  })
  .setDescription(content)
  
  channel.send({ embeds: [embed] });

}


async function timeRemaining(targetDate: string) {
    try {
 
     let nowDate = new Date().getTime()
     let finalDate = new Date(targetDate).getTime()
 
     let diffTime = finalDate - nowDate
     var days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
     var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
     var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
 
     return {
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds
       };
 
    } catch(e) {
     throw new Error("Error at timeRemaining function: " + e)
    }
  }
 

export {timeRemaining, sendToChannel}