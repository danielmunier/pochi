import { Events, VoiceState, VoiceChannel } from 'discord.js';
import { LoggingService } from '../services/loggingService';

export const name = Events.VoiceStateUpdate;

export async function execute(oldState: VoiceState, newState: VoiceState) {
  const member = newState.member;
  const guild = newState.guild;
  
  if (!member || !guild) return;

  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  // Obtém o serviço de logging do client
  const loggingService = (member.client as any).loggingService as LoggingService;
  
  if (!loggingService) return;

  // Entrou em um canal de voz
  if (!oldChannel && newChannel && newChannel instanceof VoiceChannel) {
    console.log(`🎵 ${member.user.tag} entrou no canal de voz: ${newChannel.name} (${guild.name})`);
    await loggingService.logVoiceJoin(guild, member.user, newChannel);
  }
  
  // Saiu de um canal de voz
  else if (oldChannel && !newChannel && oldChannel instanceof VoiceChannel) {
    console.log(`🎵 ${member.user.tag} saiu do canal de voz: ${oldChannel.name} (${guild.name})`);
    await loggingService.logVoiceLeave(guild, member.user, oldChannel);
  }
  
  // Mudou de canal de voz
  else if (oldChannel && newChannel && oldChannel.id !== newChannel.id && 
           oldChannel instanceof VoiceChannel && newChannel instanceof VoiceChannel) {
    console.log(`🎵 ${member.user.tag} mudou do canal ${oldChannel.name} para ${newChannel.name} (${guild.name})`);
    await loggingService.logVoiceMove(guild, member.user, oldChannel, newChannel);
  }
  
  // Mudou de estado (mute, unmute, deafen, undeafen)
  else if (oldChannel && newChannel && oldChannel.id === newChannel.id) {
    const changes = [];
    
    if (oldState.mute !== newState.mute) {
      changes.push(newState.mute ? 'mutou' : 'desmutou');
    }
    
    if (oldState.deaf !== newState.deaf) {
      changes.push(newState.deaf ? 'deafou' : 'deafou');
    }
    
    if (oldState.streaming !== newState.streaming) {
      changes.push(newState.streaming ? 'iniciou stream' : 'parou stream');
    }
    
    if (oldState.selfVideo !== newState.selfVideo) {
      changes.push(newState.selfVideo ? 'ligou câmera' : 'desligou câmera');
    }
    
    if (changes.length > 0) {
      console.log(`🎵 ${member.user.tag} ${changes.join(', ')} no canal ${newChannel.name} (${guild.name})`);
    }
  }
}
