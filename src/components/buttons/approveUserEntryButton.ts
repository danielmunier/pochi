import { Client } from "discord.js";
import logger from "../../utils/beautyLog";
const { certifyGuildConfig } = require("../../utils/guildUtils");


module.exports = {
    data: {
        id: "enter-guild-approve"
    },
    async execute(interaction: any, client: Client) {
        try {
            // Verifica se o botão foi clicado em um contexto de mensagem válida com embeds
            if (!interaction.message || !interaction.message.embeds || interaction.message.embeds.length === 0) {
                throw new Error("O botão deve estar vinculado a um embed para aprovação.");
            }

            const embedDescription = interaction.message.embeds[0].description;
            
            // Extrai o ID do usuário a partir da descrição do embed
            const userIdMatch = embedDescription.match(/UserId: <@(\d+)>/);
            if (!userIdMatch) {
                throw new Error("ID do usuário não foi encontrado na descrição do Embed");
            }
         
            const userId = userIdMatch[1];
            const guildData = await certifyGuildConfig(interaction.guild);
            if(!guildData) {
                throw new Error("O servidor não foi encontrado na base de dados.");
            }

            // Busca o membro associado ao ID do usuário
            let member;
            try {
                member = await interaction.guild.members.fetch(userId);
            } catch (fetchError) {
                throw new Error("Não foi possível encontrar o membro. Ele pode ter saído do servidor.");
            }

            if (!member) {
                throw new Error("Membro não encontrado no servidor.");
            }

            
            const rolesToAdd = guildData.formEntryConfig.rolesMemberApproved; 

            // Cargo ou cargos em que o usuário recebe quando entra o servidor. Dai quando o admin aprova o bot remove esses cargos para que o usuário nao tenha mais acesso ao canal de "verificação"

            const verificationRolesToRemove = guildData.formEntryConfig.rolesVerification;

            for (const roleId of verificationRolesToRemove) {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
                    await member.roles.remove(role);
                } else {
                    throw new Error(`Cargo com ID ${roleId} não encontrado.`);
                }
            }

           

            if(!rolesToAdd || rolesToAdd.length === 0) {
                throw new Error("Nenhum cargo foi configurado para adicionar ao membro.");
            }

            // Remove os cargos antigos do membro

            // Adiciona os cargos ao membro
            for (const roleId of rolesToAdd) {
                const role = interaction.guild.roles.cache.get(roleId);
                if (role) {
                    await member.roles.add(role);
                } else {
                    throw new Error(`Cargo com ID ${roleId} não encontrado.`);
                }
            }

            // Responde ao usuário que aprovou o membro
            await interaction.reply({ content: `Usuário ${member.user.tag} foi aprovado com sucesso.`, ephemeral: false });

        } catch (e) {
            logger.error(`Erro ao aprovar usuário: ${e}`);
        }
    }
};
