import { Client, Collection, GatewayIntentBits, Partials } from "discord.js"
import { config } from './config'
import { join } from "path";
import { readdirSync } from "fs";
import { Command, SlashCommand } from "./types";
import logger from "./utils/beautyLog";

require("./database/index")
logger.info("Bot is starting")




const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
        partials: [
            Partials.Channel,
            Partials.Message
          ]
})


client.slashCommands = new Collection<string, SlashCommand>()
client.commands = new Collection<string, Command>()
client.cooldowns = new Collection<string, number>()
client.buttons = new Collection<string, string>()
client.modals = new Collection<string, string>()


const handlersDir = join(__dirname, "./functions/handlers")
readdirSync(handlersDir).forEach(handler => {
    if (!handler.endsWith(".ts")) return;
    require(`${handlersDir}/${handler}`)(client)
})


client.login(config.DISCORD_TOKEN).then(()=> {
    client.handleEvents()
    client.handleCommands()
    client.handleComponents()

})
