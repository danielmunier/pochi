const fs = require('fs')




guild_db = {
    path: './ranking.json',
    create(guild_id) {
        try {
            const db = JSON.parse(fs.readFileSync(this.path, 'utf8'))

            // Verificar se a guilda já existe
            const data = guild_db.read(guild_id)
            if (data) {
                /*   console.log("[GUILD][CREATE] Guilda já existente") */
                return
            }
            /*  console.log("[GUILD][CREATE] Guilda não existente, sendo criada...") */


            const register = {
                guild_id: guild_id,
                users: []

            }
            db.push(register)
            fs.writeFileSync(this.path, JSON.stringify(db), 'utf8')

        } catch (err) {
            console.log("[GUILD][CREATE] Erro ao criar uma guilda..." + err)
        }


    },

    read(guild_id) {
        try {
            let database = fs.readFileSync(this.path, 'utf8');
            if (!database) {
                console.log("Arquivo JSON vazio.");
                database = "[]";
                fs.writeFileSync(this.path, database, 'utf8')
            }

            const data = JSON.parse(database);


            // Encontre a guilda com base no guild_id
            const guildaEncontrada = data.find(guild => guild.guild_id === guild_id);
            if (guildaEncontrada) {
                /*   console.log("[GUILD][READ] Guilda encontrada"); */
                return guildaEncontrada;
            } else {
                /* console.log("[GUILD][READ] Guilda não encontrada."); */
                return null;
            }
        } catch (err) {
            console.log("[GUILD][READ] Erro ao ler o arquivo JSON: " + err);
            return null;
        }
    },
    delete(guild_id) {
        try {
            const db = fs.readFileSync(this.path, 'utf8')
            const data = guild_db.read(guild_id)

            if (!data) {
                /*  console.log("[DELETE] Erro ao deletar guilda. Guilda pode ser inexistente.") */
                return false
            }

            const new_data = JSON.parse(db).filter((guild) => guild.guild_id != guild_id)

            if (JSON.stringify(new_data) != JSON.stringify(db)) {
                /*   console.log("[DELETE] Guilda deletada com sucesso!") */
                fs.writeFileSync(this.path, JSON.stringify(new_data), 'utf8')

                return true
            }

            return false



        } catch (err) {
            console.log("Error" + err)
        }


    }


}







module.exports = { guild_db }
