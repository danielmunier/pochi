import { Collection, ChatInputCommandInteraction, Events } from 'discord.js';

// Extensão do Client para incluir commands
declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>;
  }
}

// Interface para comandos
export interface Command {
  data: any;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

// Interface para eventos
export interface Event {
  name: Events;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;
}

// Interface para serviços Python
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Configurações do bot
export interface BotConfig {
  token: string;
  clientId: string;
  guildId?: string;
  services: {
    moderation: string;
    music: string;
    economy: string;
  };
}
