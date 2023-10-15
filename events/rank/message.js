const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { guild_db } = require("../../utils/guild");
const { user_db } = require("../../utils/user");

async function updateRoles(guild, user, client) {
  const xpRoles = [
    {level: "membro", xpRequired: 0, id: '970167616717086760'},
    { level: "veterano", xpRequired: 1000, id: '1147971164052930640' },
    { level: "elite", xpRequired: 5000, id: '1148039871127097384' },
    { level: "mestre", xpRequired: 10000, id: '1147971306571190302' },
    { level: "lendario", xpRequired: 20000, id: '1050492025541247087' },
    { level: "divino", xpRequired: 50000, id: '1042721419047481406' },
  ];

  // Verifique se o usuário é um membro do servidor.
  const member = guild.members.cache.get(user.user_id);
  if (!member) {
    console.log("Usuário não encontrado no servidor.");
    return;
  }

  let highestRole = null;

  const userRoles = member.roles.cache.filter((role) =>
  xpRoles.some((xpRole) => role.id === xpRole.id)
);
for (const xpRole of xpRoles) {
  if (user.xp >= xpRole.xpRequired) {
    highestRole = xpRole;
  }
}

if(highestRole) {
  const role = guild.roles.cache.get(highestRole.id);

  if (role) {
    // Remove os cargos existentes do usuário na lista
    userRoles.forEach((existingRole) => {
      if (xpRoles.some((xpRole) => existingRole.id === xpRole.id)) {
        member.roles.remove(existingRole);
      }
    })


  }
  await member.roles.add(role.id)
}


 
}

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    const client = message.client;
    const guild = guild_db.read(message.guildId);

    if (!guild) {
      guild_db.create(message.guildId);
    }

    let user = user_db.read(message.guildId, message.author.id);
    if (!user) {
      user_db.create(message.guildId, message.author.id);
      user = user_db.read(message.guildId, message.author.id);
    }

    user_db.update(message.guildId, message.author.id, 0, 1); // Incrementa o número de mensagens de um usuário em uma certa guild
    user_db.get_xp(message.guildId, message.author.id);
    
    const guild_discord = client.guilds.cache.get(message.guildId);
    if (guild) {
      await updateRoles(guild_discord, user, client);
    }
  }
};
