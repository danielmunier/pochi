import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent} from "../../types";
import logger from "../../util/beautyLog";
import fs from "fs"

module.exports = (client: Client) => {



  client.handleEvents = async () => {
    const eventsFolders = fs.readdirSync("./src/events/")
   
    for (const folder of eventsFolders) {
      const eventsFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".ts"));
        
        switch (folder) {
          case "client":
            for (const file of eventsFiles) {
                const event = require(`../../events/${folder}/${file}`)
                  logger.info(`[ACTIVADED] [EVENT] ${file}`)

                  if(event.once)  {
                  client.once(event.name, (...args) => event.execute(...args, client))
                  } else {
                     client.on(event.name, (...args) => event.execute(...args, client));
                  }
               
               
               
            }


            break;
        
          default:
            for (const file of eventsFiles) {
              const event = require(`../../events/${folder}/${file}`)
                logger.info(`[ACTIVADED] [EVENT] ${file}`)

                if(event.once)  {
                client.once(event.name, (...args) => event.execute(...args, client))
                } else {
                   client.on(event.name, (...args) => event.execute(...args, client));
                }
             
             
             
          }

            break;
        }


    }
  }



};