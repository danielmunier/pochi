import { SlashCommandBuilder, AttachmentBuilder, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../../../types";
import logger from "../../../util/beautyLog";
import axios from "axios"




const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Shows the bang of Makima character")

    ,
    execute: async interaction => {
        try {
            

        const attachment = new AttachmentBuilder("./assets/makimaBang.jpg")
        logger.info(`${interaction.client.ws.ping}`)
        interaction.reply({
            files: [attachment]
        })
        } catch(e) {
            logger.error(`${e}`)
        }
    },
    cooldown: 10
}

export default command