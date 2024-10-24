import { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextChannel } from "discord.js";
import logger from "../../utils/beautyLog";
import prisma from "../../utils/prismadb"
import { certifyGuildConfig } from "../../utils/guildUtils";


module.exports = {
    data: {
        id: "secret-modal"
    },
    async execute(interaction: any, client: Client) {
        try {

            if (!interaction.isModalSubmit()) return;


            const guild = interaction.guild.id

            const channel = interaction.guild.channels.cache.get("1284224086758789244")
            const text = interaction.fields.getTextInputValue("confess-input");
            logger.info(`${interaction.user.id}[${interaction.user.username}: ${text}]`)
            channel?.send({ content: text })

            interaction.reply({ content: "Sua mensagem foi enviada com sucesso!", ephemeral: true })


        } catch (error) {
            logger.error(`Erro ao processar solicitação de entrada: ${error}`);
        }
    }
};
