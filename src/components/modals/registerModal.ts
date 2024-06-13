import { Client, ModalSubmitFields } from "discord.js";
import config from "../../settings/pochi.json"
import axios from "axios"

module.exports = {
    data: {
        id: "register-modal"
    },
    async execute(interaction: any, client: any) {

        
        if(!interaction.isModalSubmit()) return 
        


        const name = interaction.fields.getTextInputValue("name")
        const socialMedia = interaction.fields.getTextInputValue("social_media")
        const inviteOrigin = interaction.fields.getTextInputValue("invite_origin")
        const intention = interaction.fields.getTextInputValue("intention")
        const age = interaction.fields.getTextInputValue("age")

        const data = {
            name: name,
            social_media: socialMedia,
            invite_origin: inviteOrigin,
            intention: intention,
            age: age
        }

        axios.post(config.sheetdb.url, data, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.SHEETDB_TOKEN}`
            }
        }).then(response => {
            //console.log(response.data); 
        })
        .catch(error => {
            //console.error(error);
        });


        interaction.reply({content: `Obrigado por se cadastrar!`, ephemeral: true})
    }
}