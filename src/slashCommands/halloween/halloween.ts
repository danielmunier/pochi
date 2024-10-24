import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import logger from "../../utils/beautyLog";
import prisma from "../../utils/prismadb";

const MAX_USES = 10; // Limite de usos por ciclo
const RESET_INTERVAL = 10 * 60 * 1000; // 10 minutos em milissegundos

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("halloween")
        .setDescription("Halloween event command"),

    execute: async (interaction) => {
        try {
            const treats = [
                { name: 'Bis', points: 10 },
                { name: 'Box of Good Good', points: 1 },
                { name: 'KitKat', points: 20 },
                { name: 'Twix', points: 30 },
                { name: 'Snickers', points: 50 },
                { name: 'Caixa de bombom da Nestlê', points: 50 },
                { name: 'M&Ms', points: 100 },
                { name: 'Dinheiro achado no bolso', points: 30 },
                { name: 'Lindt ', points: 150 },
                { name: 'Feastables MrBeast Milk', points: 200 }
            ];

            const tricks = [
                { name: 'Derrota na Ranked', points: -5 },
                { name: 'Panfleto de Político', points: -10 },
                { name: 'Vácuo na DM do insta', points: -10 },
                { name: 'Papel com merda', points: -20 },
                { name: 'Chifre', points: -40 },
                { name: 'Ligação de cobrança', points: -60 },
                { name: 'Comprovante de pagamento falso', points: -60 },
                { name: 'Saco de pipoca queimada', points: -60 },
                { name: 'Camisinha usada', points: -80 },
                { name: 'Foto da pica no grupo da família', points: -80 },
                { name: 'Mensagem da ex', points: -150 }
            ];

            const halloweenEmojis = ['🎃', '👻', '🍬', '💀', '🧡', '🦇', '🕷️', '🧛🏻‍♀️', '🪓', '🕯️', '🔮', '˚˖𓍢ִ໋', '✧˚'];
            const randomEmoji = halloweenEmojis[Math.floor(Math.random() * halloweenEmojis.length)];

            const isTreat = Math.random() > 0.5;
            let result = isTreat ? treats[Math.floor(Math.random() * treats.length)] : tricks[Math.floor(Math.random() * tricks.length)];

            const userId = interaction.user.id;
            const guild = interaction.guild;

            if (!guild) return;

            const serverId = guild.id;
            const currentTime = new Date();

            // Buscar pontos e contador de comandos do usuário
            const userPoints = await prisma.userPoints.findFirst({
                where: { userId, serverId }
            });

            if (userPoints) {
                const timeDifference = currentTime.getTime() - userPoints.lastResetAt.getTime();

                // Se passou mais de 10 minutos desde o último reset, reinicie o contador
                if (timeDifference >= RESET_INTERVAL) {
                    await prisma.userPoints.update({
                        where: { id: userPoints.id },
                        data: {
                            commandCount: 0,
                            lastResetAt: currentTime
                        }
                    });
                }

                // Verifica se o usuário atingiu o limite de 10 usos
                if (userPoints.commandCount >= MAX_USES) {
                    const remainingTime = Math.ceil((RESET_INTERVAL - timeDifference) / 1000 / 60); // Tempo restante em minutos
                    return interaction.reply({ content: `⏳ Você usou o comando 10 vezes. Aguarde mais ${remainingTime} minutos antes de usá-lo novamente.` , ephemeral: true });
                }
            }

            // Se o usuário não tem registro ou está abaixo do limite, permite o uso do comando
            if (!userPoints) {
                const newUserPoints = await prisma.userPoints.create({
                    data: {
                      userId,
                      serverId,
                      points: result.points,
                      lastCommandAt: currentTime, // Incluindo o campo obrigatório
                      lastResetAt: currentTime,   // Inicializando o campo lastResetAt
                      commandCount: 1             // Inicializando o contador de comandos
                    }
                  });
                  
                return interaction.reply({ content: `Você ganhou ${randomEmoji} ***${result.name}*** (${result.points} pontos)! Pontuação atual: ${newUserPoints.points}` });
            }

            // Incrementar o contador e atualizar pontos
            const updatedPoints = await prisma.userPoints.update({
                where: { id: userPoints.id },
                data: {
                    points: Math.max(userPoints.points + result.points, 0), // Garante que não fique abaixo de 0
                    commandCount: userPoints.commandCount + 1,
                    lastResetAt: userPoints.lastResetAt
                }
            });

            interaction.reply({ content: `${randomEmoji} Você ganhou ***${result.name}*** (${result.points}). Você possui ${updatedPoints.points} pontos ${randomEmoji}` });

        } catch (e) {
            logger.error(`${e}`);
        }
    },
    cooldown: 60
}

export default command;
