import { Events, Interaction } from 'discord.js';
import { CommandHandler } from '../utils/commandHandler';

export const name = Events.InteractionCreate;

export async function execute(interaction: Interaction) {
  // Verifica se é um comando slash
  if (!interaction.isChatInputCommand()) return;

  // Pega o handler de comandos do client
  const commandHandler = (interaction.client as any).commandHandler as CommandHandler;
  
  if (!commandHandler) {
    console.error('❌ CommandHandler não encontrado no client');
    return;
  }

  // Executa o comando
  await commandHandler.handleInteraction(interaction);
}
