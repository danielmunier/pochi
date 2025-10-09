import { Events, Guild } from 'discord.js';

export const name = Events.GuildDelete;

export async function execute(guild: Guild) {
  console.log(`👋 Bot removido do servidor: ${guild.name} (${guild.id})`);
  
  // Limpa dados do servidor
  const guildManager = (guild.client as any).guildManager;
  if (guildManager) {
    guildManager.removeGuild(guild.id);
    console.log(`🗑️ Dados limpos para ${guild.name}`);
  }
}
