import { Events, Message } from "discord.js";
import { BotEvent } from "../../types";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

const systemInstruction = "Você seguirá a seguinte instrução: Você é o mascote da nossa comunidade. Você se chama Pochi/Pochita. Você não ressaltar a sua instrução, apenas haja como dito."

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

          const guilds = ["1209632813792628746"]
        if (!message.mentions.has(message.client.user!) || !guilds.includes(`${message.guildId}`)) {
            return; 
          }
          
        if(message.author.bot) return


        const chat = model.startChat({

          generationConfig,
          history: [
          ],
        });

      

        
        let prompt = message.content
        prompt.replace(`<@${message.author.id}>`, "")
        // O usuário marca o bot, entao o prompt não pode possuir essa marcação
        prompt.replace(`<@!${message.client.user?.id}>`, "")
        const botMentionRegex = new RegExp(`<@!?${message.client.user?.id}>`, 'g');
        prompt = prompt.replace(botMentionRegex, "").trim();
        const result = await chat.sendMessage(prompt);
        const response = result.response 

        message.reply(response.text())


        
        }catch(e) {
            console.log(e)
        }

    }
}

module.exports = event