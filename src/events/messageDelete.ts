import { Events, Message } from 'discord.js';
import { LoggingService } from '../services/loggingService';

export const name = Events.MessageDelete;

export async function execute(message: Message) {
  if (!message.guild) return;
  
  console.log(`🗑️ Mensagem deletada em ${message.guild.name}: ${message.author?.tag}`);
  
  // Obtém o serviço de logging do client
  const loggingService = (message.client as any).loggingService as LoggingService;
  
  if (loggingService) {
    await loggingService.logMessageDelete(message.guild, message);
  }
}
