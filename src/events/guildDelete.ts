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
  
  // Atualiza a atividade do bot após remoção do servidor (com throttling inteligente)
  const activityService = (guild.client as any).activityService;
  if (activityService) {
    activityService.updateActivity();
    console.log(`🔄 Atividade agendada para atualização (servidor removido: ${guild.name})`);
  }

  // Envia notificação via webhook
  const webhookService = (guild.client as any).webhookService;
  if (webhookService) {
    await webhookService.notifyGuildLeft(guild);
  }
}
