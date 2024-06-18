import { Client } from "discord.js";
import logger from "../../util/beautyLog";

module.exports = {
    data: {
        id: "enter-guild-approve"
    },
    async execute(interaction: any, client: Client) {
        try {
            const embedDescription = interaction.message.embeds[0].description;
            
            const userIdMatch = embedDescription.match(/UserId: <@(\d+)>/);
            if (!userIdMatch) {
                throw new Error("ID do usuário não foi encontrado na descrição do Embed");
            }
         
            const userId = userIdMatch[1];

            let member;
            try {
                member = await interaction.guild.members.fetch(userId);
            } catch (fetchError) {
                throw new Error("Não foi possível encontrar o membro. Ele pode ter saído do servidor.");
            }

            if (!member) {
                throw new Error("Membro não encontrado no servidor.");
            }

            const role = interaction.guild.roles.cache.find((r: { name: string; }) => r.name === "membro");
            if (role) {
                await member.roles.add(role);
                await interaction.reply({ content: `User ${member.user.tag} has been approved.`, ephemeral: true });
            } else {
                throw new Error("Role not found");
            }

        } catch (e) {
            logger.error(`${e}`);
        
        }
    }
};