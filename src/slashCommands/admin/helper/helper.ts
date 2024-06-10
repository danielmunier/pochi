import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../../../types";

const command: SlashCommand = {


    command: new SlashCommandBuilder()
        .setName("helper")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Create ticket panel for support"),
    execute: interaction => {
        if (!interaction || !interaction.guild) return
     


        let main_embed = new EmbedBuilder()
            .setColor("#ffa500") 
            .setDescription(
                `Bem-vindo à Central de Ajuda do ${interaction.guild.name}!
            Aqui, você encontrará todas as respostas para suas dúvidas e poderá entrar em contato com nossa equipe de suporte.
            
            Para garantir uma experiência tranquila, recomendamos que você leia cuidadosamente as opções disponíveis abaixo. Estamos aqui para ajudar e faremos o possível para resolver qualquer problema que você possa enfrentar.
            
            Fique à vontade para explorar as opções abaixo e encontrar a assistência que melhor atenda às suas necessidades.
    
        `
            )
            .setAuthor({
                name: interaction.guild.name,
            })


            const ticketButton = new ButtonBuilder() 
            .setCustomId("create-ticket")
            .setLabel("Criar ticket")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("\u{1F4E5}")

            const reportButton = new ButtonBuilder()
            .setCustomId("report")
            .setLabel("Fazer uma denúncia")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("\u{1F4E2}")

            const suggestionButton = new ButtonBuilder()
            .setCustomId("suggestion")
            .setLabel("Fazer uma sugestão")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("\u{1F4E6}")

              

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(ticketButton, reportButton, suggestionButton);
            

            interaction.reply({embeds: [main_embed], components: [row]})
    },
    cooldown: 10
}

export default command