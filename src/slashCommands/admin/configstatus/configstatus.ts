import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { SlashCommand } from "../../../types";
import logger from "../../../utils/beautyLog";

const GuildConfig = require("../../../database/schemas/guildSchema");

const command: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("configstatus")
        .setDescription("Atualiza ou remove status personalizados e os cargos associados")
        .addSubcommand(subcommand =>
            subcommand
                .setName("update")
                .setDescription("Atualiza status personalizados e os cargos associados")
                .addStringOption(option =>
                    option.setName("terms")
                        .setDescription("Novos termos de status personalizados separados por vírgula")
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName("roles")
                        .setDescription("Novos IDs dos cargos separados por vírgula")
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName("warnchannel")
                        .setDescription("Novo ID do canal de aviso")
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("Remove um conjunto de status personalizados e cargos associados")
                .addStringOption(option =>
                    option.setName("terms")
                        .setDescription("Termos de status personalizados separados por vírgula a serem removidos")
                        .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "Você não tem permissão para usar este comando!", ephemeral: true });
        }

        const subcommand = interaction.options.getSubcommand();
        const terms = interaction.options.getString("terms")!.split(",").map(term => term.trim());

        try {
            const guildId = interaction.guild!.id;
            let guildConfig = await GuildConfig.findOne({ guildId });

            if (!guildConfig) {
                return interaction.reply({ content: "Nenhuma configuração encontrada para esta guilda.", ephemeral: true });
            }

            if (subcommand === "update") {
                const roles = interaction.options.getString("roles")!.split(",").map(roleId => roleId.trim());
                const warnChannelId = interaction.options.getString("warnchannel");

                const index = guildConfig.customStatusRoles.findIndex((config: { statusTerms: any[]; }) => 
                    config.statusTerms.some((term: string) => terms.includes(term))
                );

                if (index !== -1) {
                    guildConfig.customStatusRoles[index] = {
                        statusTerms: terms,
                        roleIds: roles,
                        warnChannelId: warnChannelId || null
                    };
                } else {
                    guildConfig.customStatusRoles.push({
                        statusTerms: terms,
                        roleIds: roles,
                        warnChannelId: warnChannelId || null
                    });
                }

                await guildConfig.save();
                interaction.reply({ content: "Configuração de status personalizada atualizada com sucesso!", ephemeral: true });
                logger.info(`Configuração de status personalizada atualizada para a guilda ${interaction.guild!.name}`);
            } else if (subcommand === "remove") {
                guildConfig.customStatusRoles = guildConfig.customStatusRoles.filter((config: { statusTerms: any[]; }) => 
                    !config.statusTerms.some((term: string) => terms.includes(term))
                );

                await guildConfig.save();
                interaction.reply({ content: "Configuração de status personalizada removida com sucesso!", ephemeral: true });
                logger.info(`Configuração de status personalizada removida para a guilda ${interaction.guild!.name}`);
            }
        } catch (error) {
            logger.error(`Erro ao atualizar/remover a configuração de status personalizada: ${error}`);
            interaction.reply({ content: "Erro ao atualizar/remover a configuração. Tente novamente mais tarde.", ephemeral: true });
        }
    },
    cooldown: 10
};

export default command;
