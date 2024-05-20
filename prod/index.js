"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const path_1 = require("path");
const fs_1 = require("fs");
const beautyLog_1 = __importDefault(require("./util/beautyLog"));
let cron = require("node-cron");
require("./database/index");
beautyLog_1.default.info("Bot is starting");
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildPresences, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.MessageContent, discord_js_1.GatewayIntentBits.GuildMembers],
    partials: [
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.Message
    ]
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand())
        return;
    const command = client.slashCommands.get(interaction.commandName);
    if (!command)
        return;
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
});
client.slashCommands = new discord_js_1.Collection();
client.commands = new discord_js_1.Collection();
client.cooldowns = new discord_js_1.Collection();
const handlersDir = (0, path_1.join)(__dirname, "./handlers");
(0, fs_1.readdirSync)(handlersDir).forEach(handler => {
    if (!handler.endsWith(".ts"))
        return;
    require(`${handlersDir}/${handler}`)(client);
});
client.login(config_1.config.DISCORD_TOKEN);
