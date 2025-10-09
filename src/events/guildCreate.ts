import { Events, Guild } from 'discord.js';

export const name = Events.GuildCreate;

export async function execute(guild: Guild) {
  console.log(`🎉 Bot adicionado ao servidor: ${guild.name} (${guild.id})`);
  console.log(`👥 Membros: ${guild.memberCount}`);
  
  const guildManager = (guild.client as any).guildManager;
  if (guildManager) {
    guildManager.getGuildConfig(guild.id);
    console.log(`⚙️ Configurações inicializadas para ${guild.name}`);
  }
}
