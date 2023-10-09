const fs = require('fs')




guild_db = {
    path: './ranking.json',
    create(guild_id) {
        try {
            const db = JSON.parse(fs.readFileSync(this.path, 'utf8'))
            
            // Verificar se a guilda já existe
            const data = guild_db.read(guild_id)
            if(data) {
                console.log("[CREATE] Guilda já existente")
                return 
            }
            console.log("[CREATE] Guilda não existente, sendo criada...")


            const register = {
                guild_id: guild_id,
                users: []

            }
            db.push(register)
            fs.writeFileSync(this.path, JSON.stringify(db), 'utf8')

        } catch (err) {
            console.log("[CREATE] Erro ao criar uma guilda..." + err)
        }


    },

    read(guild_id) {
        try {
            let database = fs.readFileSync(this.path, 'utf8');
            if(!database) {
                console.log("Arquivo JSON vazio.");
                database = "[]"; 
                fs.writeFileSync(this.path, database, 'utf8')
            }

            const data = JSON.parse(database);

    
            // Encontre a guilda com base no guild_id
            const guildaEncontrada = data.find(guild => guild.guild_id === guild_id);
            if (guildaEncontrada) {
                console.log("[READ] Guilda encontrada");
                return guildaEncontrada;
            } else {
                console.log("[READ] Guilda não encontrada.");
                return null;
            }
        } catch (err) {
            console.log("[READ] Erro ao ler o arquivo JSON: " + err);
            return null;
        }
    },
    delete(guild_id) {
     try {
        const db = fs.readFileSync(this.path, 'utf8')
        const data = guild_db.read(guild_id)

        if(!data) {
            console.log("[DELETE] Erro ao deletar guilda. Guilda pode ser inexistente.")
            return false
        }

        const new_data = JSON.parse(db).filter((guild) => guild.guild_id != guild_id)

        if(JSON.stringify(new_data) != JSON.stringify(db)) {
            console.log("[DELETE] Guilda deletada com sucesso!")
            fs.writeFileSync(this.path, JSON.stringify(new_data), 'utf8')

            return true
        }

        return false



     } catch(err) {
        console.log("Error" + err)
     }  


    }


}




user = {
    create(guild_id, user_ID) {
        try {
            let database = JSON.parse(fs.readFileSync(guild_db.path, 'utf8'))
        
            let data = guild_db.read(guild_id)
            if(!data) {
                 console.log("Guilda não encontrada")
                 return null
            }
        
     
            let user = data.users.find((user) => user.user_id === user_ID)
     
             if(user) {
                 console.log("[USER][CREATE] Usuario já existente")
     
                 return null
             }
            
             database.map((guild) => {
                 if(guild.guild_id === guild_id) {
                     guild.users.push( {user_id: user_ID,
                         total_messages: "0",
                         joined_time: "0",
                         total_time: "0"})
                 }
             })
     
            
            
             fs.writeFileSync(guild_db.path, JSON.stringify(database), 'utf8')
             console.log("Usuário criado com sucesso!")
        }catch(err) {
            console.log("Erro ao criar usuario: " + err)
        }
        
    },

    read(guild_id, user_ID) {
        const database = fs.readFileSync(guild_db.path, 'utf8')
        let data_guild = guild_db.read(guild_id)
        if(!data_guild) {
            return false
        }

        let userToFind = {};
        data_guild.users.map((user) => {
            if(user.user_id === user_ID) {
                console.log(user)
                userToFind = {}
            }
            
        })

        if(!userToFind){
            console.log("Usuário não encontrado. ")
            return false
        }

        return userToFind


      
            
    },

    update(guild_id, user_ID) {

    }
}


user.read("321", "123")

