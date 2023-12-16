import { CommandInteraction, SlashCommandBuilder } from "discord.js";


export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong");




async function execute(interaction: CommandInteraction) {
        return interaction.reply("pong")
}
