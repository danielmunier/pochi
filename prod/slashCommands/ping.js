"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command = {
    command: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the bot's ping"),
    execute: interaction => {
        console.log("PING");
        interaction.reply({
            embeds: [
                new discord_js_1.EmbedBuilder()
                    .setAuthor({ name: "MRC License" })
                    .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
            ]
        });
    },
    cooldown: 10
};
exports.default = command;
