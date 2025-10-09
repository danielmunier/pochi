import { Events, GuildMember } from 'discord.js';
import { LoggingService } from '../services/loggingService';

export const name = Events.GuildMemberAdd;

export async function execute(member: GuildMember) {
  const guild = member.guild;
  const user = member.user;
  
  console.log(`👋 ${user.tag} entrou no servidor ${guild.name}`);
  
  // Obtém o serviço de logging do client
  const loggingService = (member.client as any).loggingService as LoggingService;
  
  if (loggingService) {
    await loggingService.logMemberJoin(guild, user);
  }
}
