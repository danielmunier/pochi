const fs = require('fs');



async function get_ranking({ guild_id, path }) {

  const data = JSON.parse(fs.readFileSync(path, 'utf8'))
  let ranking = []
  for (guild of data) {

    if (guild.guild_id === guild_id) {
      for (user of guild.users) {
        ranking.push({ userId: user.user_id, xp: user.xp})
      }
    }
  }


  ranking.sort((a, b) => b.xp - a.xp)

  const topResults = ranking.slice(0, 10)

  return topResults

}


async function get_ranking_message({ guild_id, path }) {

  const data = JSON.parse(fs.readFileSync(path, 'utf8'))
  let ranking = []
  for (guild of data) {

    if (guild.guild_id === guild_id) {
      for (user of guild.users) {
        ranking.push({ userId: user.user_id, messages: user.total_messages})
      }
    }
  }


  ranking.sort((a, b) => b.messages - a.messages)

  const topResults = ranking.slice(0, 10)

  return topResults

}



module.exports = { get_ranking, get_ranking_message }

