import { Events, Message } from 'discord.js';
import { LoggingService } from '../services/loggingService';

export const name = Events.MessageUpdate;

export async function execute(oldMessage: Message, newMessage: Message) {
  if (!newMessage.guild) return;
  if (oldMessage.content === newMessage.content) return;
  
  console.log(`✏️ Mensagem editada em ${newMessage.guild.name}: ${newMessage.author?.tag}`);
  
  // Obtém o serviço de logging do client
  const loggingService = (newMessage.client as any).loggingService as LoggingService;
  
  if (loggingService) {
    await loggingService.logMessageUpdate(newMessage.guild, oldMessage, newMessage);
  }
}
