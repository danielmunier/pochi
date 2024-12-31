import { Client, Events, TextChannel, VoiceChannel } from "discord.js";
import { BotEvent } from "../../types";

const listarConvites = async (client: Client, guildId: string) => {
    const guild = await client.guilds.fetch(guildId);

    client.guilds.cache.forEach(async (guild) => {
        try {
            // Tenta buscar os convites existentes da guilda
            const invites = await guild.invites.fetch();

            // Mostra cada convite no console
            invites.forEach((invite) => {
                console.log(`Convite: ${invite.code} | Canal: ${invite.channel?.name} | Convidado por: ${invite.inviter?.tag}`);
            });
        } catch (error) {
            console.error(`Não foi possível buscar os convites para a guilda ${guild.name}:`, error);
        }
    });
}

const listarCargos = async (client: Client, guildId: string) => {
    try {
        // Busca a guilda (servidor) pelo ID
        const guild = await client.guilds.fetch(guildId);

        // Verifica se a guilda foi encontrada
        if (!guild) {
            console.log("Guilda não encontrada.");
            return;
        }

        // Lista todos os cargos da guilda
        const roles = guild.roles.cache;
        console.log(`Cargos no servidor "${guild.name}":`);
        roles.forEach((role) => {
            console.log(`- ${role.name} (ID: ${role.id})`);
        });
    } catch (error) {
        console.error("Erro ao listar os cargos:", error);
    }
};

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    active: true,
    execute: async (client: Client) => {

        console.log('Pochi está ligado!')






    }
}


module.exports = event