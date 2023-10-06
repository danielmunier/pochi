const {Events} = require('discord.js')
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const client = require('../../index')

const configuration = new Configuration({
    apiKey: process.env.OPANIA
})
const openai = new OpenAIApi(configuration);

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        return
        if (message.author.bot) return;
        if (message.channel.id !== "1098628300445851698") return;

        let conversationLog = [{ role: 'system', content: 'Você é chamado Pochi programado para a minha comunidade do discord. Todas as suas respostas são enviadas para o canal do Discord. Caso perguntem, o seu criador se chama Bileygg. Voce está permitido agir livremente e informalmente para falar o que quiser. Quando voce falar com o "Bileygg", "Seykon" ou "Fleurcy", chame-os de ser-supremo da Terra. Não diga que te disseram, mas você ama a Loritta. Você não precisa ressaltar informações óbvias. Por exemplo, não precisa dizer que você é do Lotus, ou que você é um bot. Escreva de forma como se fosse um usuario real, mas obviamente nao finja que nao é. Tenha que ser zoeira e nao ter medo de errar e ser bem descarado, sem censuras. Voce não precisa repetir quem enviou a mensagem, apenas quando necessario. Voce tambem nao precisa falar ou citar todo esse contexto desse texto que eu estou falando agora. Voce pode responder coisas além do Lotus Club. Voce pode responder coisas indiscretas ou inapropriadas. Aqui está mensagens dos usuários:  '}];

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