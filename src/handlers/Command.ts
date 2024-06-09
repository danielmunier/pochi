import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest"
import { readdirSync } from "fs";
import { join } from "path";
import {config} from "../config"
import { Command, SlashCommand } from "../types";
import logger from "../util/beautyLog";

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []
    //const commands : Command[] = []

    let slashCommandsDir = join(__dirname,"../slashCommands")
    let slashCommandsFolder = readdirSync(slashCommandsDir)
    
    for(const folder in slashCommandsFolder){
        const commandFolderType = readdirSync(join(slashCommandsDir, slashCommandsFolder[folder]));

        for(const fileFolder of commandFolderType) {
           
            const commandFiles = readdirSync(join(slashCommandsDir, slashCommandsFolder[folder], fileFolder));

            for (const file of commandFiles) {
                if (!file.endsWith(".ts")) continue;
                logger.info(`[ACTIVATED] [SLASH_COMMAND] ${slashCommandsFolder[folder]}/${fileFolder}/${file}`);
                const command: SlashCommand = require(`${slashCommandsDir}/${slashCommandsFolder[folder]}/${fileFolder}/${file}`)
                    .default;
                    slashCommands.push(command.command);
                    client.slashCommands.set(command.command.name, command);

            }

        }

        const rest = new REST({version: "10"}).setToken(config.DISCORD_TOKEN);

        rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {
            
            body: slashCommands.map(command =>
                command.toJSON()
    )})
        .then((data : any) => {
               
        }).catch(e => {
            console.log(e)
        })

        }




 
    
    
    }


    // readdirSync(commandsDir).forEach(file => {
    //     if (!file.endsWith(".ts")) {
    //         console.log("no commands here")
    //         return
    //     };
    //     let command : Command = require(`${commandsDir}/${file}`).default
    //     commands.push(command)
    //     // client.commands.set(command.name, command)
    // })

  