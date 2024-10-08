import { SlashCommandBuilder, AttachmentBuilder, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../../../types";
import logger from "../../../utils/beautyLog";
import axios from "axios"




const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("bang")
    .setDescription("Shows the bang of Makima character")

    ,
    execute: async interaction => {
        try {
            

        const attachment = new AttachmentBuilder("./assets/makimaBang.jpg")
      
         interaction.reply({
            files: [attachment]
        })
        const message = await interaction.fetchReply()
        } catch(e) {
            logger.error(`${e}`)
        }
    },
    cooldown: 10
}

export default command