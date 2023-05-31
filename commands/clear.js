const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const request = require("request")


// Esse comando limpa mensagens do canal do Discord

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .addNumberOption(option =>
		option.setName('clear_number')
			.setDescription('Número de mensagens apagadas')
			.setRequired(true)
			)
    .setDescription("Apagar mensagens"),
    async execute(interaction) {
                    let clear_number = await interaction.options.getNumber('clear_number')
                    
                    if(!interaction.member.permissions.has("MANAGER_MESSAGES")){
                      await interaction.reply({content: "Você não possui permissão para isso", ephemeral: true})
                      return
                    }else{
                      if(clear_number>0 && clear_number < 100){
                        await interaction.reply({content: `${clear_number} mensagens apagadas.`}).then(() => {
                          setTimeout(() => {
                            interaction.channel.bulkDelete(parseInt(clear_number + 1), true)
                    
                          , 5000})
                         })
                      }else{
                        await interaction.reply({content: "Número incorreto", ephemeral: true})
                      }
                    
                    }




    }
}

