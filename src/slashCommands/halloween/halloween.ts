import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../types";
import logger from "../../utils/beautyLog";
import prisma from "../../utils/prismadb";

const MAX_USES = 10; 
const RESET_INTERVAL = 10 * 60 * 1000; 

const treats = [
    { name: 'Bis', points: 10 },
    { name: 'Box of Good Good', points: 1 },
    { name: 'KitKat', points: 20 },
    { name: 'Twix', points: 30 },
    { name: 'Snickers', points: 50 },
    { name: 'Caixa de bombom da Nestlê', points: 50 },
    { name: 'M&Ms', points: 100 },
    { name: 'Dinheiro achado no bolso', points: 30 },
    { name: 'Lindt', points: 150 },
    { name: 'Feastables MrBeast Milk', points: 180 }
];

const tricks = [
    { name: 'Derrota na ranked', points: -5 },
    { name: 'Panfleto de campanha política', points: -10 },
    { name: 'Vácuo na DM do insta', points: -10 },
    { name: 'Papel com merda de diarreia', points: -20 },
    { name: 'Chifre', points: -40 },
    { name: 'Ligação de cobrança', points: -60 },
    { name: 'Comprovante de pagamento falso', points: -60 },
    { name: 'Saco de pipoca queimada', points: -60 },
    { name: 'Camisinha usada', points: -80 },
    { name: 'Foto da pica no grupo da família', points: -80 },
    { name: 'Mensagem da ex', points: -180 }
];

const halloweenEmojis = ['🎃', '👻', '🍬', '💀', '🧡', '🦇', '🕷️', '🧛🏻‍♀️', '🪓', '🕯️', '🔮'];

const getRandomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("halloween")
        .setDescription("Halloween event command"),

    execute: async (interaction) => {
        try {
            const isTreat = Math.random() > 0.5;
            const result = getRandomElement(isTreat ? treats : tricks);
            const randomEmoji = getRandomElement(halloweenEmojis);

            const userId = interaction.user.id;
            const guild = interaction.guild;

            if (!guild) return;

            const serverId = guild.id;
            const currentTime = new Date();

            const userPoints = await prisma.userPoints.findFirst({
                where: { userId, serverId }
            });

            if (userPoints) {
                const timeDifference = currentTime.getTime() - userPoints.lastResetAt.getTime();

                if (timeDifference >= RESET_INTERVAL) {
                    await prisma.userPoints.update({
                        where: { id: userPoints.id },
                        data: {
                            commandCount: 0,
                            lastResetAt: currentTime
                        }
                    });
                }

                if (userPoints.commandCount >= MAX_USES) {
                    const remainingTime = Math.ceil((RESET_INTERVAL - timeDifference) / 1000 / 60);
                    return interaction.reply({ content: `⏳ Você usou o comando 10 vezes. Aguarde mais ${remainingTime} minutos antes de usá-lo novamente.`, ephemeral: true });
                }
            }

            const updatedUserPoints = userPoints
                ? await prisma.userPoints.update({
                    where: { id: userPoints.id },
                    data: {
                        points: Math.max(userPoints.points + result.points, 0),
                        commandCount: userPoints.commandCount + 1,
                        lastResetAt: userPoints.lastResetAt
                    }
                })
                : await prisma.userPoints.create({
                    data: {
                        userId,
                        serverId,
                        points: result.points,
                        lastCommandAt: currentTime,
                        lastResetAt: currentTime,
                        commandCount: 1
                    }
                });

            interaction.reply({
                content: `${randomEmoji} Você ${isTreat ? 'ganhou' : 'sofreu'} ***${result.name}*** (${result.points} pontos). 
                Pontuação atual: ${updatedUserPoints.points}`
            });

        } catch (e) {
            logger.error(`${e}`);
        }
    },
    cooldown: 60
}

export default command;
