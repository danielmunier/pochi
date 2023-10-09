const { 
    Events
} = require("discord.js")

const fs = require("fs")
const { user_db, guild_db } = require("../../utils/guild")

module.exports = {
    name: Events.MessageCreate,
    async execute(message){
        if(message.author.bot) return;
        let guild =  guild_db.read(message.guildId)
        if(!guild){
            guild_db.create(message.guildId)
        }
        let user = user_db.read(message.guildId, message.author.id)
        if(!user) {
            user_db.create(message.guildId, message.author.id)
        }

        user_db.update(message.guildId, message.author.id, 0, 1)

        
            
    }
}