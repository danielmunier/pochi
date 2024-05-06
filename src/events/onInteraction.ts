import { Events, Interaction } from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
    name: Events.MessageCreate,
    once: false,
    active: true,
    execute: (message: MessageEvent) => {
          //  console.log(message)
    }
}


export default event; 