import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Client, TextChannel } from "discord.js";
import logger from "../../utils/beautyLog";
import { certifyGuildConfig } from "../../utils/guildUtils";
import prisma from "../../utils/prismadb"

module.exports = {
    data: {
        id: "create-ticket"
    },
    async execute(interaction: any, client: Client) {
        try {
            // Certificar a configuração da guilda
            let guildData = await certifyGuildConfig(interaction.guild);

            if (!guildData) {
                logger.error(`Dados da guilda não encontrados para ${interaction.guild.name}`);
                return;
            }

            // Encontrar a configuração do ticket específico
            const ticketConfig = await prisma.ticketConfig.findUnique({where: {guildId: guildData.guildId}})
            if (!ticketConfig) {
                logger.error(`Configuração de ticket não encontrada para ${interaction.guild.name}`);
                return;
            }

            // Verificar se a categoria de ticket existe
            let ticketCategory = interaction.guild.channels.cache.get(ticketConfig.ticketCategoryId);

            if (!ticketCategory) {
                ticketCategory = await interaction.guild.channels.create({
                    name: 'tickets',
                    type: ChannelType.GuildCategory
                });
                ticketConfig.ticketCategoryId = ticketCategory.id;
                await prisma.ticketConfig.update({
                    where: { guildId: guildData.guildId },
                    data: { ticketCategoryId: ticketCategory.id }
                });
                logger.info(`Categoria "tickets" criada para a guilda ${interaction.guild.name}`);
            }

            // Verificar se já existe um canal de ticket para o usuário
            const ticketChannelExists = interaction.guild.channels.cache.find((c: { name: string; }) => c.name === `ticket-${interaction.user.username}`);

            if (ticketChannelExists) {
                interaction.reply({
                    content: `Você já possui um ticket aberto! <#${ticketChannelExists.id}>`,
                    ephemeral: true
                });
                return;
            }

            logger.info(`Criando canal de ticket para ${interaction.user.username}`);

            // Criar o canal de ticket dentro da categoria
            const channel: TextChannel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: ticketCategory.id,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel', 'SendMessages']
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['ViewChannel']
                    }
                ]
            });

            const closeButton = new ButtonBuilder()
                .setCustomId("close-ticket")
                .setLabel("Fechar ticket")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("\u{1F4E2}");

            const row = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(closeButton);

            await channel.send({
                content: `Olá ${interaction.user.username}, seja bem vindo ao seu ticket! Aguarde um administrador responder. Para fechar o ticket, basta clicar no botão abaixo.`,
                components: [row]
            });

            interaction.reply({
                content: `Ticket criado com sucesso! <#${channel.id}>`,
                ephemeral: true
            });

        } catch (error) {
            logger.error(`${error}`);
        }
    }
};
