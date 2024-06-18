import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, ModalSubmitFields, TextChannel } from "discord.js";
import config from "../../settings/pochi.json"
import axios from "axios"




module.exports = {
    data: {
        id: "register-modal"
    },
    async execute(interaction: any, client: any) {

        
        if(!interaction.isModalSubmit()) return 
        
        const filterUserEntry = interaction.member.guild.channels.cache.get("1229905956368941167") as TextChannel


        const userId = interaction.member
        const name = interaction.fields.getTextInputValue("name")
        const socialMedia = interaction.fields.getTextInputValue("social_media")
        const inviteOrigin = interaction.fields.getTextInputValue("invite_origin")
        const intention = interaction.fields.getTextInputValue("intention")
        const age = interaction.fields.getTextInputValue("age")

        const data = {
            userId: userId,
            name: name,
            social_media: socialMedia,
            invite_origin: inviteOrigin,
            intention: intention,
            age: age
        }

        
        const aprove_button = new ButtonBuilder() 
        .setCustomId("enter-guild-approve")
        .setLabel("Aprovar entrada")
        .setStyle(ButtonStyle.Primary)

        const decline_button = new ButtonBuilder() 
        .setCustomId("enter-guild-decline")
        .setLabel("Recusar entrada")
        .setStyle(ButtonStyle.Danger)

        

          

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(aprove_button, decline_button);



        const embed = new EmbedBuilder()
        .setTitle(interaction.guild.name)
        .setDescription(`UserId: ${userId}\n \n **Nome**: ${name}\n**Social Media**: ${socialMedia}\n**Origem do convite**: ${inviteOrigin}\n**Intencao**: ${intention}\n**Idade**: ${age}`)
        .setColor("DarkBlue")
        .setTimestamp()



        filterUserEntry.send({
            embeds: [embed],
            components: [row]
        })


       
        axios.post(config.sheetdb.url, data, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.SHEETDB_TOKEN}`
            }
        }).then(response => {
            console.log(response.data); 
        })
        .catch(error => {
            console.error(error);
        });


        interaction.reply({content: `Obrigado por se cadastrar!`, ephemeral: true})
    }
}