import { Client } from "discord.js";
import logger from "../../util/beautyLog";

module.exports = {
    data: {
        id: "enter-guild-decline"
    },
    async execute(interaction: any, client: Client) {
        try {
           console.log("Usuário recusado")
           console.log(interaction.member)
            
        }   catch(e)  {
            logger.error(`${e}`)
        }
    
        }
}