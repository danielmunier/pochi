const { Events, ActivityType } = require("discord.js");
const axios = require("axios")

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("Lotus Club", { type: ActivityType.Playing });



  }
    
}
