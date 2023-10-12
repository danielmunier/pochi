const {
  Events,
  Client,
  GatewayIntentBits,
  Partials
} = require("discord.js")
const fs = require("fs")
const { guild_db } = require("../../utils/guild")
const { user_db } = require("../../utils/user")


async function ranking(guild_id, user, client) {
  cargos = {
    membro: {
      nome: "Membro",
      xp: 0,
      id: '970167616717086760',
    },
    veterano: {
      nome: "Veterano",
      xp: 1000,
      id: '1147971164052930640',
    },
    elite: {
      nome: "Elite",
      xp: 5000,
      id: '1148039871127097384',
    },
    mestre: {
      nome: "Mestre",
      xp: 10000,
      id: '1147971306571190302',
    },
    lendario: {
      nome: "Lendário",
      xp: 20000,
      id: '1050492025541247087',
    },
    divino: {
      nome: "Divino",
      xp: 50000,
      id: '1042721419047481406',
    },
  }

const guild = client.guilds.cache.get(guild_id)
/* const member = guild.members.fetch(user.user_id) */
// Pega o cargo atual
// Se não tiver um cargo, adicione um
// Quando o usuario possui xp suficiente para o proximo cargo, deve-se remover o anterior e adicionar o seguinte.

const member = guild.members.cache.get(user.user_id)
    for(cargo in cargos) {
      console.log(indexOf(cargos[cargo]))
         if(user.xp >= cargos[cargo].xp) {

             let role = guild.roles.cache.get(cargos[cargo].id)
       
             member.roles.add(cargos[cargo].id) 
             break

         }
    }
}

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    const client = message.client
    let guild = guild_db.read(message.guildId)
    if (!guild) {
      guild_db.create(message.guildId)
    }
    let user = user_db.read(message.guildId, message.author.id)
    if (!user) {
      user_db.create(message.guildId, message.author.id)
    }

    user_db.update(message.guildId, message.author.id, 0, 1) // Incrementa o numero de mensagens de um usuário em uma certa guild 
    user_db.get_xp(message.guildId, message.author.id)
   await ranking(message.guildId, user, client)

    /* const guild_to_fetch = client.guilds.cache.get(message.guildId)
    const member = await guild_to_fetch.members.fetch(message.author.id)
    console.log(member) */
  }
}