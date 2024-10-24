import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import { readdirSync } from "fs";
import { join, resolve } from "path";
import { config } from "../../config";
import { SlashCommand } from "../../types";
import logger from "../../utils/beautyLog";
import fs from "fs"

module.exports = (client: Client) => {
  client.handleCommands = async () => {
    const slashCommands: SlashCommandBuilder[] = [];
    const commandsPath = resolve(__dirname, "../../slashCommands"); 


    const loadCommands = (dir: string) => {
      const files = readdirSync(dir);
        for(const file of files) {
          const stat = fs.lstatSync(join(dir, file));
          if(stat.isDirectory()) {
            loadCommands(join(dir, file));
          } else if(file.endsWith(".ts")) {
            const command: SlashCommand = require(join(dir, file)).default;
            logger.info(`[ACTIVADED] [COMMAND] ${command.command.name}`);
            slashCommands.push(command.command);
            client.slashCommands.set(command.command.name, command);
          }
        }
    };

    loadCommands(commandsPath);

    const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

    try {
      await rest.put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {
        body: slashCommands.map(command => command.toJSON())
      });
      logger.info('Successfully registered application commands.');
    } catch (error) {
      logger.error('Failed to register application commands:' + error);
    }
  };
};
