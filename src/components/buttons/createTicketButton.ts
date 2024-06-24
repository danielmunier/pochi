import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Client, TextChannel } from "discord.js";
import logger from "../../utils/beautyLog";
const { certifyGuildConfig } = require("../../utils/guildUtils");

module.exports = {
    data: {
        id: "create-ticket"
    },
    async execute(interaction: any, client: Client) {
        try {
            let guildData = await certifyGuildConfig(interaction.guild);
            console.log("ID: " + guildData.ticketConfig.ticketCategoryId)
            if (!guildData.ticketConfig.ticketCategoryId) {
                let ticketCategory = interaction.guild.channels.cache.find((channel: { name: string; type: ChannelType; }) => channel.name === 'tickets' && channel.type === ChannelType.GuildCategory); // Procura se há alguma categoria com nome "tickets"

                if (!ticketCategory) {
                    ticketCategory = await interaction.guild.channels.create({
                        name: 'tickets',
                        type: ChannelType.GuildCategory
                    });
                    logger.info(`Categoria "tickets" criada para a guilda ${interaction.guild.name}`);
                }

                guildData.ticketConfig.ticketCategoryId = ticketCategory.id;
                await guildData.save();
            }

            // Verificar se a categoria ainda existe
            const category = interaction.guild.channels.cache.get(guildData.ticketConfig.ticketCategoryId);
            if (!category) {
                let ticketCategory = await interaction.guild.channels.create({
                    name: 'tickets',
                    type: ChannelType.GuildCategory
                });
                logger.info(`Categoria "tickets" recriada para a guilda ${interaction.guild.name}`);

                guildData.ticketConfig.ticketCategoryId = ticketCategory.id;
                await guildData.save();
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

            logger.info(`Creating ticket channel for ${interaction.user.username}`);

            // Criar o canal de ticket dentro da categoria
            const channel: TextChannel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: guildData.ticketConfig.ticketCategoryId,
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

            channel.send({ content: `Olá ${interaction.user.username}, seja bem vindo ao seu ticket! Aguarde um administrador responder. Para fechar o ticket, basta clicar no botão abaixo.`, components: [row] });

            interaction.reply({
                content: `Ticket criado com sucesso! <#${channel.id}>`,
                ephemeral: true
            });

        } catch (e) {
            logger.error(`${e}`);
        }
    }
};
