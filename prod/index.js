"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
const path_1 = require("path");
const fs_1 = require("fs");
console.log("Bot is starting");
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildPresences, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.MessageContent],
    partials: [
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.Message
    ]
});
const handlersDir = (0, path_1.join)(__dirname, "./handlers");
(0, fs_1.readdirSync)(handlersDir).forEach(handler => {
    if (!handler.endsWith(".ts"))
        return;
    require(`${handlersDir}/${handler}`)(client);
});
client.login(config_1.config.DISCORD_TOKEN);
