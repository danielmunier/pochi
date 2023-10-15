const fs = require('fs')
/* const {guild_db} = require("./guild") */
user_db = {
    create(guild_id, user_ID) {
        try {
            let database = JSON.parse(fs.readFileSync(guild_db.path, 'utf8'))
            let data = guild_db.read(guild_id)
            if (!data) {
                console.log("Guilda não encontrada")
                return null
            }


            let user = data.users.find((user) => user.user_id === user_ID)

            if (user) {
                console.log("[USER][CREATE] Usuario já existente")

                return null
            }

            database.map((guild) => {
                if (guild.guild_id === guild_id) {
                    guild.users.push({
                        user_id: user_ID,
                        xp: 0,
                        level: 0,
                        role: "",
                        total_messages: 0,
                        joined_time: "0",
                        total_time: 0,
                        vip: false
                    })
                }
            })



            fs.writeFileSync(guild_db.path, JSON.stringify(database), 'utf8')
            console.log("Usuário criado com sucesso!")
        } catch (err) {
            console.log("Erro ao criar usuario: " + err)
        }

    },

    read(guild_id, user_ID) {
        const database = fs.readFileSync(guild_db.path, 'utf8')
        let data_guild = guild_db.read(guild_id)
        if (!data_guild) {
            return false
        }
        
        let userToFind = null;
        data_guild.users.map((user) => {
            if (user.user_id === user_ID) {
                userToFind = user
            }

        })

        if (!userToFind) {
            console.log("[USER][READ] Usuário não encontrado. ")
            return false
        }
        console.log("[USER][READ]Usuário encontrado")

        return userToFind




    },

    update(guild_id, user_ID, voice_time = 0, messages = 0, xp = 0, level = 0) {
        let database = JSON.parse(fs.readFileSync(guild_db.path, 'utf8'))
        let guildToUpdate = null;
        let userToUpdate = null
        for(guild of database) {
            if(guild.guild_id === guild_id) {
                guildToUpdate = true
                for(user of guild.users) {
                    if(user.user_id === user_ID) {
                        userToUpdate = true
                        user.total_time += voice_time
                        user.total_messages += messages
                     
                        

                    }
                }

            }
        }

        if(!guildToUpdate) {
            console.log("Guilda não encontrada")
            return
        }

        if(!userToUpdate) {
            console.log("Usuário não encontrado")
            return
        }

        fs.writeFileSync(guild_db.path, JSON.stringify(database), 'utf8')
    },

    get_xp(guild_id, user_id) {
    let database = JSON.parse(fs.readFileSync(guild_db.path, 'utf8'))
    let guild = guild_db.read(guild_id)
    let user = user_db.read(guild_id, user_id);

    if(!guild) {
        console.log("[USER][XP] Guilda não encontrada")
        return false
    }
    if(!user) {
        console.log("[XP] Usuário não encontrado")
        return false;

    }


    for(guild of database) {
        for(user of guild.users) {
            if(user.user_id === user_id && guild.guild_id === guild_id) {
                if(user.vip) {
                    user.xp += 20
                }

                user.xp+=10


            }
        }
    }


    fs.writeFileSync(guild_db.path, JSON.stringify(database))

    return true
    





    },
    
    update_role(guild_id, user_id, role_id) {
        let database = JSON.parse(fs.readFileSync(guild_db.path, 'utf8'))
        let guild = guild_db.read(guild_id)
        let user = user_db.read(guild_id, user_id);
    
        if(!guild) {
            console.log("[USER][XP] Guilda não encontrada")
            return false
        }
        if(!user) {
            console.log("[XP] Usuário não encontrado")
            return false;
    
        }
    
    
        for(guild of database) {
            for(user of guild.users) {
                if(user.user_id === user_id && guild.guild_id === guild_id) {
                  user.role = role_id
    
                }
            }
        }
    
    
        fs.writeFileSync(guild_db.path, JSON.stringify(database))
    
        return true
    }

       


}



module.exports = { user_db }