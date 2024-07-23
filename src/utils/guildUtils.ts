import { Guild } from "discord.js";
import prisma from "../utils/prismadb";
import logger from "./beautyLog";

export async function certifyGuildConfig(guild: Guild) {
    try {
        let guildConfig = await prisma.guild.findUnique({
            where: { guildId: guild.id },
            include: {
                FormEntry: true,
                ticketConfig: true,
                lobbyConfig: true,
                customStatus: true,
            },
        });

        console.log('Current Guild Config:', guildConfig);

        if (!guildConfig) {
            console.log(`Creating new configuration for guild ${guild.id}`);
            
            const customStatusRole = await prisma.customStatusRole.create({
                data: {
                    guildId: guild.id,
                    statusTerms: [],
                    roleIds: [],
                    warnChannelId: null,
                },
            });

            const formEntryConfig = await prisma.formEntry.create({
                data: {
                    guildId: guild.id,
                    formChannelId: null,
                    rolesMemberApproved: [],
                    rolesVerification: [],
                },
            });

            const ticketConfig = await prisma.ticketConfig.create({
                data: {
                    guildId: guild.id,
                    ticketCategoryId: null,
                },
            });

            const lobbyConfig = await prisma.lobbyConfig.create({
                data: {
                    guildId: guild.id,
                    lobbyCommandImage: null,
                },
            });

            guildConfig = await prisma.guild.create({
                data: {
                    guildId: guild.id,
                    FormEntry: {
                        connect: { id: formEntryConfig.id },
                    },
                    ticketConfig: {
                        connect: { id: ticketConfig.id },
                    },
                    lobbyConfig: {
                        connect: { id: lobbyConfig.id },
                    },
                    customStatus: {
                        connect: { id: customStatusRole.id },
                    },
                },
                include: {
                    FormEntry: true,
                    ticketConfig: true,
                    lobbyConfig: true,
                    customStatus: true,
                },
            });

            logger.info(`Pré-configuração criada para a guilda ${guild.name}`);
        } else {
            logger.info(`Configuração já existente para a guilda ${guild.name}`);
        }

        return guildConfig;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
