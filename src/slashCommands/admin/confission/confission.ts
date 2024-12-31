import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../../../types";
import prisma from "../../../utils/prismadb";
const { certifyGuildConfig } = require("../../../utils/guildUtils")

const command: SlashCommand = {


    command: new SlashCommandBuilder()
        .setName("confesse")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Embed de confissões"),
    execute: async interaction => {
        if (!interaction || !interaction.guild) return

        const guildData = await certifyGuildConfig(interaction.guild)


        let main_embed = new EmbedBuilder()
        .setColor("#FF4500") // Uma cor vibrante para chamar atenção
        .setTitle("🔒 Confissões Anônimas")
        .setDescription(
            `✨ **Confesse aqui seu segredo mais profundo...**  
            Sua mensagem será enviada anonimamente para o canal de conversa.  
            *Ninguém saberá que foi você... ou saberão?*`
        )
        .setFooter({ text: "⚠️ Por favor, respeite as regras do servidor" })
        .setTimestamp();

        const lobby_button = new ButtonBuilder()
            .setCustomId("confess-button")
            .setLabel("Clique aqui")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("❤")




        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(lobby_button);

        await interaction.reply({
            embeds: [main_embed], components: [row]
        })
    },
    cooldown: 10
}

export default command