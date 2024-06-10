import { Events, Message } from "discord.js";
import { BotEvent } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const event: BotEvent = {
    name: Events.MessageCreate,
    once: false,
    active: true,
    execute: async (message: Message) => {
        const main_guild = "1209632813792628746"
        if (!message.mentions.has(message.client.user!) || message.guildId !== main_guild) {
            return; 
          }
          
        if(message.author.bot) return

        const prompt = message.content

        const result = await model.generateContent(prompt)
        const response = result.response 

        message.reply(response.text())

        console.log(response)


    }
}


export default event;