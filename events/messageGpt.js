const {Events} = require('discord.js')
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const client = require('../index')

const configuration = new Configuration({
    apiKey: process.env.OPANIA
})
const openai = new OpenAIApi(configuration);

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {


        if (message.author.bot) return;
        if (message.channel.id !== "1129630077886418986") return;

        let conversationLog = [{ role: 'system', content: 'Você é um bot programado para responder perguntas sobre minha comunidade do discord, a comunidade se chama Lotus Club. Responda com formato markdown quando for necessário, pois absolutamente todas as suas respostas são enviadas para o canal do Discord. Caso perguntem, o seu criador se chama Bileygg. '}];

        try {
            await message.channel.sendTyping();
            let prevMessages = await message.channel.messages.fetch({limit: 10});
            prevMessages.reverse();

            prevMessages.forEach((msg) => {
                if (msg.author.id !== client.user.id && message.author.bot) return;
                if (msg.author.id !== message.author.id) return;
                
                conversationLog.push({
                    role: 'user',
                    content: msg.content,
                });
            });

            const response = await openai
            .createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: conversationLog,
              })
              .catch((error) => {
                console.log(`GPT ERROR: ${error}`);
              });
            message.reply(response.data.choices[0].message);
        } catch (error) {
            console.log(`ERROR: ${error}`)
        }
    }
};