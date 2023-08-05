const { SlashCommandBuilder } = require('discord.js')
const { get_latest_post } = require('../../functions/instagram/get_latest_post')
const fs = require('fs')





module.exports = {
    data: new SlashCommandBuilder()
    .setName('instagram')
    .addStringOption(option =>
		option.setName('profile_user')
			.setDescription('Usuário do instagram')
			.setRequired(true)
			)
    .setDescription("Consultar ultimo post do usuário do instagram"),
    async execute(interaction) {
                   
      const profile_user =  interaction.options.getString('profile_user')
      const channel = interaction.channel
      const guild = interaction.guild
      const data = fs.readFileSync("data.json");
      const data_json = JSON.parse(data);
      
      if(!data_json[guild.id]) {
        data_json[guild.id] = {
          [profile_user]: {
            channel_id: channel.id,
            latest_post: ""
          }
        }
      } else {
        for(data_json_user in data_json[guild.id]) { 
          if(data_json_user === profile_user) {
            data_json[guild.id][profile_user].channel_id = channel.id
          } else {
            data_json[guild.id][profile_user] = {
              channel_id: channel.id,
              latest_post: ""
            }
          }
        }
      }




      

    }
}

