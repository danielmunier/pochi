import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../../../types";
import { LobbyConfig } from "../../../database/schemas/lobbyConfigSchema";
const { certifyGuildConfig } = require("../../../utils/guildUtils")

const command: SlashCommand = {


    command: new SlashCommandBuilder()
        .setName("lobby")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Create ticket panel for support"),
    execute: async interaction => {
        if (!interaction || !interaction.guild) return

        const guildData = await certifyGuildConfig(interaction.guild)
        const GUILD_ID = guildData.guildId
        const lobby_config = await LobbyConfig.findOne({guildId: GUILD_ID})


        let main_embed = new EmbedBuilder()
            .setColor("#000000")
            .setTitle("Verificação")
            .setDescription(
                `
        Clique no botão abaixo e preencha nosso formulário que em breve um administrador irá aprovar o seu acesso.
    
        `
            )

        const lobby_button = new ButtonBuilder()
            .setCustomId("enter-guild")
            .setLabel("Liberar canais")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("🔓")


        if(lobby_config?.lobby_command_image) {
            main_embed.setImage(lobby_config?.lobby_command_image)
        
        }



        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(lobby_button);

        await interaction.reply({
            embeds: [main_embed], components: [row]
        })
    },
    cooldown: 10
}

export default command