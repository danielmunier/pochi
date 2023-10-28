const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { guild_db } = require("../../utils/Guild");
const { user_db } = require("../../utils/user");

async function updateRoles(guild, user, client) {
  const xpRoles = [
    { level: "membro", xpRequired: 0, id: '970167616717086760' },
    { level: "veterano", xpRequired: 1000, id: '1147971164052930640' },
    { level: "mestre", xpRequired: 5000, id: '1148039871127097384' },
    { level: "elite", xpRequired: 10000, id: '1147971306571190302' },
    { level: "lendario", xpRequired: 20000, id: '1050492025541247087' },
    { level: "divino", xpRequired: 50000, id: '1042721419047481406' },
  ];

  let highestRole = null;

  for (const role of xpRoles) {
    if (user.xp >= role.xpRequired) {
      highestRole = role;
    } else {
      break;
    }
  }


  if (highestRole && highestRole.id != user.role) {
    const role = guild.roles.cache.get(highestRole.id);
    const member = guild.members.cache.get(user.user_id);

    const rolesToRemove = xpRoles.map((role) => role.id).filter((roleId) => roleId !== highestRole.id);
    await member.roles.remove(rolesToRemove);
    console.log("Silêncio, o usuário está upando")
    if (!role) {
      console.log("Cargo não encontrado")
      return
    }



    await user_db.update_role(guild.id, user.user_id, role.id)
    await member.roles.add(role.id)

  } else {
    console.log("Usuário já possui ou possuiu esse cargo")
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
    }
    user_db.update({ guild_id: guild_id, user_id: user_id, messages: 1 }); // Incrementa o número de mensagens de um usuário 
    user_db.get_xp(guild_id, user_id); // Incrementa o número de experiência do usuário


    const guildToUpdate = client.guilds.cache.get(guild_id);
    if (guildToUpdate) {


      let current_role = user_db.get_role(guild_id, user_id);
      await updateRoles(guildToUpdate, userExist, client);
      let updated_role = user_db.get_role(guild_id, user_id);
      // Se a antes da funçao updateRoles for acionada o cargo do usuario for diferente, quer dizer que ele upou
      if (current_role != updated_role) {
        const member = guildToUpdate.members.cache.get(user_id);


        const channelLeveling = client.channels.cache.get("1153749391417557166")
        let role = guildToUpdate.roles.cache.get(updated_role)
        channelLeveling.send({ content: `O membro <@${message.author.id}> upou para o cargo **${role.name}**! Parabéns!` })
      }
    }
  }
};
