const fs = require('fs');

// Aqui terá tudo relacionado ao banco de dados pra funcionar o comando/evento de instagram


async function post_user(username, guild_id, channel_id, shortcode) {
    try {
       const data = fs.readFileSync('data.json')
       const data_json = JSON.parse(data)
    console.log(data_json[guild_id])
       if(data_json[guild_id] == undefined) {
          console.log('undefnied')
              data_json[guild_id] = {
                  [username]: {channel_id: channel_id, latest_post: shortcode}
              }
       }
        else {
          console.log('encontrado')
            data_json[guild_id][username] = {channel_id: channel_id, latest_post: shortcode}
        }
       
       
       fs.writeFileSync('data.json', JSON.stringify(data_json))     
    } 
        catch (error) {
        console.log(error);
    }
  
  }


  post_user("felipeneto", "159115766630854797", "12136070254003486870", 'kDHQY7Q')