import { Collection, Client } from "discord.js";
import logger from "../../util/beautyLog";

const { readdirSync, existsSync } = require("fs");
const path = require("path");




 module.exports = (client: Client) => {

 client.handleComponents = async () => {
    const folderPath = "./src/components/"
    const componentFolders = readdirSync(folderPath);
    client.modals = new Collection();

    for (const folder of componentFolders) {
      const componentFiles = readdirSync(`${folderPath}/${folder}`).filter(
        (file: any) => file.endsWith(".ts")
      );
  
      switch (folder) {
        case "modals":
          for (const file of componentFiles) {
    

            const modal = require(`../../components/${folder}/${file}`);
  
            client.modals.set(modal.data.id, modal);
            logger.info(`[ACTIVADED] [MODAL] ${modal.data.id}`)
          }
          break;


        case "buttons":
          for(const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            
            if(!button.data) continue
            client.buttons.set(button.data.id, button);
            logger.info(`[ACTIVADED] [BUTTON] ${button.data.id}`)
          }
  
        default:
        
          break;
    }
  }
 }
 }
