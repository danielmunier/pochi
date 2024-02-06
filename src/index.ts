import { Client, GatewayIntentBits, Interaction, Partials } from "discord.js"
import { config } from './config'
import { deployCommands } from "./deploy-commands";

import { join } from "path";
import { readdirSync } from "fs";

let cron = require("node-cron")

require("./database/index")

console.log("Bot is starting")


const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent],
        partials: [
            Partials.Channel,
            Partials.Message
          ]
})


const handlersDir = join(__dirname, "./handlers")
readdirSync(handlersDir).forEach(handler => {
    if (!handler.endsWith(".ts")) return;
    require(`${handlersDir}/${handler}`)(client)
})

client.login(config.DISCORD_TOKEN)
