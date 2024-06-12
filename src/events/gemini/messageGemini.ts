import { Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import config from "../../settings/pochi.json"
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

const systemInstruction = config.gemini_system_instruction

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: systemInstruction,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ]
});


const generationConfig = {
  temperature: 1.2,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 50,
  responseMimeType: "text/plain"
};

const event: BotEvent = {
    name: Events.MessageCreate,
    once: false,
    active: true,
    execute: async (message: Message) => {
        try {

          const guilds = ["1209632813792628746", "1214724025348001843", "808756652937052201"]
        if (!message.mentions.has(message.client.user!) || !guilds.includes(`${message.guildId}`)) {
            return; 
          }
          
        if(message.author.bot) return


        const chat = model.startChat({

          generationConfig,
          history: [
          ],
        });

      

        
        const prompt = message.content
        prompt.replace(`<@${message.author.id}>`, "")
        console.log(prompt)
        const result = await chat.sendMessage(prompt);
        const response = result.response 

        message.reply(response.text())


        
        }catch(e) {
            console.log(e)
        }

    }
}

module.exports = event