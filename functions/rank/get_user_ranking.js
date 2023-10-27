const fs = require('fs');



async function get_user_ranking({guild_id, user_id}) {
    const path = "../../ranking.json"

    const data = JSON.parse(fs.readFileSync(path, 'utf8'))
    let ranking = []
    for(guild of data) {
      
      if(guild.guild_id === guild_id) {
        for(user of guild.users){
        }
      }
    }
  
    
  }



