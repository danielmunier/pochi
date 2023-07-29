const { REST, Routes } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Função que realiza o deploy dos comandos
async function deployCommands() {
  const commands = [];

  const commandsPath = path.join(__dirname, 'Commands'); // Caminho para o diretório de comandos

  const readCommands = (directory) => {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.lstatSync(filePath);

      if (stat.isDirectory()) {
        // Se for uma pasta, chama recursivamente a função para ler os comandos nela
        readCommands(filePath);
      } else if (file.endsWith('.js')) {
        // Se for um arquivo .js, importa o comando
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
          commands.push(command.data);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
    }
  };

  readCommands(commandsPath);

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
}

deployCommands();

// Exporte a função deployCommands para ser utilizada em outros arquivos
module.exports = { deployCommands };
