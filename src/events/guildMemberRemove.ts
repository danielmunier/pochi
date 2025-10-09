import { Events, GuildMember, PartialGuildMember } from 'discord.js';
import { LoggingService } from '../services/loggingService';

export const name = Events.GuildMemberRemove;

export async function execute(member: GuildMember | PartialGuildMember) {
  const guild = member.guild;
  const user = member.user;
  
  if (!user) return;
  
  console.log(`👋 ${user.tag} saiu do servidor ${guild.name}`);
  
  // Obtém o serviço de logging do client
  const loggingService = (member.client as any).loggingService as LoggingService;
  
  if (loggingService) {
    await loggingService.logMemberLeave(guild, user);
  }
}
