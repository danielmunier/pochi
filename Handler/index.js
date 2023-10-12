
const fs = require("node:fs");
const path = require('node:path');
const { Collection } = require('discord.js');
const errorHandler = require('./error_handler.js');

module.exports = async(client) => {
client.commands = new Collection();
client.buttons = new Collection();
errorHandler(client);

  // Função para carregar comandos de forma recursiva
  const loadCommands = (directory) => {
    const files = fs.readdirSync(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.lstatSync(filePath);

      if (stat.isDirectory()) {
        // Se for uma pasta, chama recursivamente a função para carregar os comandos nela
        loadCommands(filePath);
      } else if (file.endsWith('.js')) {
        // Se for um arquivo .js, carrega o comando
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
          client.commands.set(command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
    }
  };

  const commandsPath = path.join(__dirname, '../commands');
  loadCommands(commandsPath);
// Events
// Função para carregar eventos de pastas individuais
const loadEvents = (directory) => {
  const folders = fs.readdirSync(directory);
  for (const folder of folders) {
    const folderPath = path.join(directory, folder);
    const stat = fs.lstatSync(folderPath);

    if (stat.isDirectory()) {
      const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
      for (const file of eventFiles) {
        const filePath = path.join(folderPath, file);
        const event = require(filePath);
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
      }
    }
  }
};

const eventsPath = path.join(__dirname, '../events'); // Path events
loadEvents(eventsPath);


}
