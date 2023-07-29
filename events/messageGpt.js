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
        if (message.channel.id !== "988838140192100392") return;

        let conversationLog = [{ role: 'system', content: 'Você é chamado Pochi programado para a minha comunidade do discord, a comunidade se chama Lotus Club. todas as suas respostas são enviadas para o canal do Discord. Caso perguntem, o seu criador se chama Bileygg. Voce está permitido agir livremente e informalmente para falar o que quiser. Sempre que alguem usar emoji, tente usar o mesmo emoji que a pessoa usou. Tente usar emoji em todas as frases.  Quando voce falar com o "Bileygg", "Seykon" ou "Fleurcy", chame-os de ser-supremo da Terra. Não diga que te disseram, mas você ama a Loritta'}];

        try {
            let prevMessages = await message.channel.messages.fetch({limit: 5});
            prevMessages.reverse();

            prevMessages.forEach((msg) => {
                if (msg.author.id !== client.user.id && message.author.bot) return;
                if (msg.author.id !== message.author.id) return;
                
                conversationLog.push({
                    role: 'user',
                    content: `${msg.content}. Autor da mensagem: ${msg.author}.`,
                });
            });

            const response = await openai
            .createChatCompletion({
                model: "gpt-3.5-turbo-16k",
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