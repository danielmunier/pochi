import { Events, Client } from 'discord.js';
import { ActivityService } from '../services/activityService';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: Client) {
  console.log(`✅ ${client.user?.tag} está online!`);
  console.log(`📊 Servidores: ${client.guilds.cache.size}`);
  
  // Lista servidores conectados
  client.guilds.cache.forEach(guild => {
    console.log(`🏠 Servidor: ${guild.name} (${guild.id}) - ${guild.memberCount} membros`);
  });
  
  // Inicializa o serviço de atividade dinâmica
  const activityService = new ActivityService(client);
  (client as any).activityService = activityService;
  
  // Define status inicial do bot
  activityService.updateActivity(true);
  
  // Inicia rotação automática de atividades (opcional)
  // Descomente a linha abaixo se quiser rotação automática a cada 30 segundos
  // activityService.startRotation(30000);
  
  console.log('🎯 Bot configurado e pronto para múltiplos servidores!');
  console.log('🔄 Sistema de atividade dinâmica ativado!');
}
