const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js');




module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription("Replies with Pong!"),
    async execute(interaction) {
    	
        const emojiId = '1095699143797788702'; // Substitua pelo ID do emoji personalizado do seu servidor

        const emoji = interaction.guild.emojis.cache.get(emojiId);
    

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setEmoji('1095699143797788702')
                .setStyle('Link')
                .setURL("https://www.google.com/search?q=dar")
            )


            const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription('Clique no botão abaixo para criar um pornozao')


            const editedEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription('Você é gay')

            await interaction.reply({ embeds: [embed], components: [button] });

            const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });

            collector.on('collect', async i => {
                await i.update({ embeds: [editedEmbed], components: [button] });
            })
    }
}
