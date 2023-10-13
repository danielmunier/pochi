const { Events, ActivityType } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice')
const axios = require("axios")

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("Lotus Club", { type: ActivityType.Playing });
    

  /*   joinVoiceChannel({
      channelId: '1101762995299815496',
      guildId: '959115766630854797',
      adapterCreator: client.guilds.cache.get('959115766630854797').voiceAdapterCreator
    }) */
    


  }
    
}
