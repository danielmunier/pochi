import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../../../types";
import settings from "../../../settings/pochi.json"


const command: SlashCommand = {


    command: new SlashCommandBuilder()
        .setName("lobby")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Create ticket panel for support"),
    execute: interaction => {
        if (!interaction || !interaction.guild) return
     

        let main_embed = new EmbedBuilder()
            .setColor("#000000") 
            .setTitle("Verificação")
            .setDescription(
                `
        Clique no botão abaixo e preencha nosso formulário que em breve um administrador irá aprovar o seu acesso.
    
        `
            )
    
            .setImage(settings.lobby_image)


            const lobby_button = new ButtonBuilder() 
            .setCustomId("enter-guild")
            .setLabel("Liberar canais")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("🔓")

            

              

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(lobby_button);
            

            interaction.reply({embeds: [main_embed], components: [row]})
    },
    cooldown: 10
}

export default command