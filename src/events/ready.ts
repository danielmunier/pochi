import { Client } from "discord.js";
import { BotEvent } from "../types";


const event: BotEvent = {
    name: "ready",
    once: true,
    execute: (client: Client) => {
        console.log("Logged in as Rimuru")
    }
}


export default event;