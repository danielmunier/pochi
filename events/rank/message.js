const { 
    Events
} = require("discord.js")

const fs = require("fs")


module.exports = {
    name: Events.MessageCreate,
    async execute(message){
        console.log(message.author.username)

            
    }
}