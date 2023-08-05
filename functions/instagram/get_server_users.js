const fs = require("fs");

// Aqui terá tudo relacionado ao banco de dados pra funcionar o comando/evento de instagram

async function get_server_users(guild_id) {
  try {
    const data = fs.readFileSync("data.json");
    const data_json = JSON.parse(data); 
    const final_data = {}
    for(user in data_json[guild_id]) {
        final_data[user] = data_json[guild_id][user]
    }
    return final_data
   

  } catch (error) {
    console.log(error);
  }
}




module.exports = { get_server_users }