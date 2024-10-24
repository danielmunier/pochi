import { ActionRowBuilder, Client, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import logger from "../../utils/beautyLog";

module.exports = {
    data: {
        id: "confess-button"
    },
    async execute(interaction: any, client: Client) {
        try {

            const modalSecret = new ModalBuilder()
                .setCustomId('secret-modal')
                .setTitle('💬');


            const text = new TextInputBuilder()
                .setCustomId('confess-input')
                .setLabel('Digite aqui seu segredo mais profundo...')
                .setPlaceholder('Escreva tudo que você sempre quis confessar.')
                .setStyle(TextInputStyle.Paragraph)  // Campo de parágrafo para permitir mais texto
                .setRequired(true)  // Definir como obrigatório
                .setMaxLength(500); // Limite máximo de caracteres

                const firstActionRow =  new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(text)


                modalSecret.addComponents(firstActionRow);
    
            await interaction.showModal(modalSecret)

        } catch (e) {
            logger.error(`${e}`)
        }

    }
}