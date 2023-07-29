const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const axios = require("axios")


// Esse comando limpa mensagens do canal do Discord

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
                   
        const profileUser = interaction.options.getString('profile_user');

        try {
            const response = await axios.get(`http://127.0.0.1:5000/instagram/${profileUser}}`);
            const data = response.data;

            const embed = new EmbedBuilder()
            .setTitle(data.user.profile_name_id)
            .setURL(`https://www.instagram.com/${profileUser}/`)
            .setThumbnail(data.user.image)
            .setDescription(data.latestPost.description)
            .setImage(data.latestPost.image)


            
          } catch (error) {
            console.error(error.message);
            interaction.reply('Ocorreu um erro ao consultar o usuário do Instagram.');
          }


    }
}

