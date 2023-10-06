const { Events, PermissionsBitField } = require("discord.js");
require("dotenv").config();

const {
  get_latest_post,
} = require("../../functions/instagram/get_latest_post.js");
const {
  get_server_users,
} = require("../../functions/instagram/get_server_users.js");

const {
  post_channel,
} = require("../../functions/instagram/post_discord_channel.js");
const fs = require("fs");


function verify_permission(channel_id, guild) {
  if(guild.members.me.permissionsIn(channel_id).has(PermissionsBitField.Flags.SendMessages)) {
    return true
  } else {
    return false
  }

}
module.exports = {
  name: Events.ClientReady,
  async execute(client) {
    const executeEvent = async () => {
      try {
        const data = fs.readFileSync("data.json");
        const data_json = JSON.parse(data);

        for (guild in data_json) {
          const guild_object = client.guilds.cache.get(guild);
          for (user in data_json[guild]) {
            const channel_id = data_json[guild][user].channel_id;
            if (!verify_permission(channel_id, guild_object)) {
              console.log(`O bot não possui permissões no canal: ${guild_object.channels.cache.get(channel_id).name} do servidor: ${guild_object.name}`);
              continue;
            }
            let user_data = data_json[guild][user];
            let latest_post = await get_latest_post(user);
            if (latest_post.post.shortcode === user_data.latest_post) {
              console.log(`[${guild_object.name}] ` + "No post of " + user + " found");
            } else {
              console.log(`[${guild_object.name}] ` + "New post of " + user + " found");
              user_data.latest_post = latest_post.post.shortcode;
              post_channel(client, user_data.channel_id, latest_post, guild_object);
              fs.writeFileSync("data.json", JSON.stringify(data_json, null, 2));
            }
          }
        }
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
    };

    // Chama a função executeEvent a cada 20 minutos (20 minutos * 60 segundos * 1000 milissegundos)
    executeEvent();
    setInterval(executeEvent, 60 * 60 * 1000);
  },
};
