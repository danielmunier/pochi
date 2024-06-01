import { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, IntegrationApplication, ButtonBuilder } from "discord.js"
import { SlashCommand } from "../../../types";

const command: SlashCommand = {


    command: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Create ticket panel for support"),
    execute: interaction => {
        if (!interaction || !interaction.guild) return

        let embed_ticket = new EmbedBuilder()
            .setColor("Random")
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

        const select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('Selecione uma opção')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('\u{1f4d6} Tirar dúvidas')
                    .setValue('duvida'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('\u{1F4E2} Fazer uma denúncia')
                    .setValue('report'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('\u{1F4AC} Mande uma sugestão')
                    .setValue('sugestao'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('\u{1f389} Resgatar um prêmio')
                    .setValue('premio'))

        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(select);

            interaction.reply({embeds: [embed_ticket], components: [row]})
    },
    cooldown: 10
}

export default command