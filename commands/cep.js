const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const request = require("request")

// Esse comando irá retornar o CEP Brasileiro, futuramente usado para rastreamento de pacotes internacionais/nacionais

const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp(Date.now())
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


module.exports = {

    
    data: new SlashCommandBuilder()
    .setName('cep')
    .addStringOption(option =>
		option.setName('cep')
			.setDescription('CEP recebido')
			.setRequired(true)
			)
    .setDescription("Consulta o CEP Brasileiro."),
    async execute(interaction) {
                    let cep = interaction.options.getString('cep')
                    let resultado = request(`https://viacep.com.br/ws/${cep}/json/`, function(error, response, body) {
                    var consulta = JSON.parse(body) 
					console.log(interaction.options.getString('cep'))

    })
    }


}

