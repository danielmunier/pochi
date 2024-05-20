import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent } from "../types";
import logger from "../util/beautyLog";


module.exports = (client: Client) => {
  let eventsDir = join(__dirname, "../events");
  for (const eventFile of readdirSync(eventsDir)) {
    if (!eventFile.endsWith(".ts")) return;
 /*    console.log("[Handler] Event " + eventFile + " loading"); */
    let event: BotEvent = require(`${eventsDir}/${eventFile}`).default;
    /* { event => expected object like:
    default: { name: 'ready', once: true, execute: [Function: execute] }
        }   */
    if (event === undefined) {
      logger.error(`[ERROR] ${eventFile} is undefined`);
    }


    if(event.active || typeof event.active == "undefined") {
      logger.info(`[ACTIVADED] ${eventFile}`)
      event.once
        ? client.once(event.name, (...args) => event.execute(...args))
        : client.on(event.name, (...args) => event.execute(...args));
    } else {
      logger.warning(`[DEACTIVADED] ${eventFile}`)
    }

  }

};
