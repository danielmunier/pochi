import { ActionRowBuilder, Interaction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputComponent, TextInputStyle } from "discord.js"
import { Client } from "undici-types"

module.exports = {
    data: {
        id: "enter-guild"
    },
    execute: async(interaction: any, client: Client) => {

            const modalRegister =  new ModalBuilder()
            .setCustomId('register-modal')
            .setTitle('Verificação de Usuário')
            

            const nameInput = new TextInputBuilder()
            .setCustomId('name')
            .setLabel('Apelido')
            .setStyle(TextInputStyle.Short)

            const social = new TextInputBuilder()
            .setCustomId('social_media')
            .setLabel('Rede Social')
            .setStyle(TextInputStyle.Short)

            const invite = new TextInputBuilder()
            .setCustomId('invite_origin')
            .setLabel('Onde encontrou o convite do servidor?')
            .setStyle(TextInputStyle.Short)

            const intention = new TextInputBuilder()
            .setCustomId('intention')
            .setLabel('Qual a sua intenção em nosso servidor?')
            .setStyle(TextInputStyle.Short)

            const age = new TextInputBuilder()
            .setCustomId('age')
            .setLabel('Idade')
            .setStyle(TextInputStyle.Short)

       

            const firstActionRow =  new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(nameInput)
            const secondActionRow =  new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(social)
            const thirdActionRow =  new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(invite)
            const fourthActionRow =  new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(intention)
            const fifthActionRow =  new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(age)

            modalRegister.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow)

            await interaction.showModal(modalRegister)



    }
}