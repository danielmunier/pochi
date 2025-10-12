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
  
  // Atualiza a atividade do bot com o novo servidor (com throttling inteligente)
  const activityService = (guild.client as any).activityService;
  if (activityService) {
    activityService.updateActivity();
    console.log(`🔄 Atividade agendada para atualização (novo servidor: ${guild.name})`);
  }

  // Envia notificação via webhook
  const webhookService = (guild.client as any).webhookService;
  if (webhookService) {
    await webhookService.notifyGuildJoined(guild);
  }
}
