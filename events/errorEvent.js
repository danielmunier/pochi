const { Events, ActivityType, Client } = require("discord.js");


function restartBot(client) {
    client.destroy(); // Destroi a instância atual do cliente
    client.login(process.env.BOT_TOKEN); // Faz o login novamente usando o token do bot
  }
  

module.exports = {
  name: Events.Error,
  once: false,
  execute(client, error) {
    console.error('Ocorreu um erro não tratado:', error);
    console.log('Reiniciando o bot...');
    restartBot(client);
  }
};

