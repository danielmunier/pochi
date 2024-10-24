import { Client } from "discord.js";
import logger from "../../utils/beautyLog";
import { certifyGuildConfig } from "../../utils/guildUtils";
import prisma from "../../utils/prismadb";


module.exports = {
    data: {
        id: "enter-guild-approve"
    },
    async execute(interaction: any, client: Client) {
        try {
            if (!interaction.message || !interaction.message.embeds || interaction.message.embeds.length === 0) {
                throw new Error("O botão deve estar vinculado a um embed para aprovação.");
            }

            const embedDescription = interaction.message.embeds[0].description;

            const userIdMatch = embedDescription.match(/UserId: <@(\d+)>/);
            if (!userIdMatch) {
                throw new Error("ID do usuário não foi encontrado na descrição do Embed");
            }

            const userId = userIdMatch[1];

            const guildData = await certifyGuildConfig(interaction.guild);
            if (!guildData) {
                throw new Error("Configuração da guilda não encontrada.");
            }

            let member;
            try {
                member = await interaction.guild.members.fetch(userId);
            } catch (fetchError) {
                throw new Error("Não foi possível encontrar o membro. Ele pode ter saído do servidor.");
            }

            if (!member) {
                throw new Error("Membro não encontrado no servidor.");
            }

            const formEntryConfig = await prisma.formEntry.findFirst({
                where: {
                    guildId: guildData.guildId
                }
            });
            if (!formEntryConfig) {
                throw new Error("Configuração de entrada de formulário não encontrada para a guilda.");
            }

            const verificationRolesToRemove = formEntryConfig.rolesVerification;
            for (const roleId of verificationRolesToRemove) {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
                    await member.roles.remove(role);
                } else {
                    console.log(`Cargo com ID ${roleId} não encontrado.`)
                }
            }

            const rolesToAdd = formEntryConfig.rolesMemberApproved;
            if (!rolesToAdd || rolesToAdd.length === 0) {
                throw new Error("Nenhum cargo foi configurado para adicionar ao membro aprovado.");
            }

            for (const roleId of rolesToAdd) {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
                    await member.roles.add(role);
                } else {
                    console.log(`Cargo com ID ${roleId} não encontrado.`)
                }
            }

            await interaction.reply({ content: `Usuário ${member.user.tag} foi aprovado com sucesso.`, ephemeral: false });

        } catch (error) {
            logger.error(`Erro ao aprovar usuário: ${error}`);
        }
    }
};
