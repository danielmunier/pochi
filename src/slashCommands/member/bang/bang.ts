import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder, AttachmentBuilder } from "discord.js"
import { SlashCommand } from "../../../types";
import logger from "../../../util/beautyLog";
const command : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("bang")
    .setDescription("Shows the bot's bang")
    ,
    execute: interaction => {

        const attachment = new AttachmentBuilder("./assets/makimaBang.jpg")
        logger.info(`${interaction.client.ws.ping}`)
        interaction.reply({
            files: [attachment]
        })
    },
    cooldown: 10
}

export default command