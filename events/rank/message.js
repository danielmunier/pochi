const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { guild_db } = require("../../utils/Guild");
const { user_db } = require("../../utils/User");

async function updateRoles(guild, user, client) {
    const xpRoles = [
      {level: "membro", xpRequired: 0, id: '970167616717086760'},
      { level: "veterano", xpRequired: 1000, id: '1147971164052930640' },
      { level: "elite", xpRequired: 5000, id: '1148039871127097384' },
      { level: "mestre", xpRequired: 10000, id: '1147971306571190302' },
      { level: "lendario", xpRequired: 20000, id: '1050492025541247087' },
      { level: "divino", xpRequired: 50000, id: '1042721419047481406' },
    ];

 /*  const xpRoles = [
    { level: "veterano", xpRequired: 1000, id: '1162955841171882105' },
    { level: "elite", xpRequired: 5000, id: '1162955944058175521' },
    { level: "mestre", xpRequired: 10000, id: '1162955987309822032' },
    { level: "lendario", xpRequired: 20000, id: '1162956029231898654' },
    { level: "divino", xpRequired: 50000, id: '1162956056310329374' },
  ]; */ // Test

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

  if (highestRole) {
    const role = guild.roles.cache.get(highestRole.id);

    if (role) {
      // Remove os cargos existentes do usuário na lista
      userRoles.forEach((existingRole) => {
        if (xpRoles.some((xpRole) => existingRole.id === xpRole.id)) {
          member.roles.remove(existingRole);
        }
      })


    }
    await user_db.update_role(guild.id, user.user_id, role.id)
    await member.roles.add(role.id)


  }



}

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    const guild_id = message.guildId
    const user_id = message.author.id
    const client = message.client;

    let guildExist = guild_db.read(guild_id);

    if (!guildExist) {
      guild_db.create(guild_id);
    }

    let userExist = user_db.read(guild_id, user_id);
    if (!userExist) {
      user_db.create(guild_id, user_id);
      user = user_db.read(guild_id, user_id);
    }


    
    user_db.update(guild_id, user_id, 0, 1); // Incrementa o número de mensagens de um usuário 
    user_db.get_xp(guild_id, user_id); // Incrementa o número de experiência do usuário

    const guildToUpdate = client.guilds.cache.get(guild_id);
    if (guildToUpdate) {
      let current_role = user_db.get_role(guild_id, message.author.id)
      await updateRoles(guildToUpdate, user, client);
      let updated_role = user_db.get_role(guild_id, message.author.id)


      if (current_role != updated_role) {
        const member = guildToUpdate.members.cache.get(user_id);
        const channelLevel = client.channels.cache.get("1121149023496192070")
        let role = guildToUpdate.roles.cache.get(updated_role)
        channelLevel.send({ content: `O membro <@${message.author.id}> upou para o cargo **${role.name}**! Parabéns!`})
      }

    }
  }
};
