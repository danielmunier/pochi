import { Events, Client, ActivityType } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: Client) {
  console.log(`✅ ${client.user?.tag} está online!`);
  console.log(`📊 Servidores: ${client.guilds.cache.size}`);
  
  // Lista servidores conectados
  client.guilds.cache.forEach(guild => {
    console.log(`🏠 Servidor: ${guild.name} (${guild.id}) - ${guild.memberCount} membros`);
  });
  
  // Define status do bot
  client.user?.setActivity(`${client.guilds.cache.size} servidores! 🚀`);
  
  console.log('🎯 Bot configurado e pronto para múltiplos servidores!');
}
