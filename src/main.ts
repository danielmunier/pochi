import { Client, GatewayIntentBits } from 'discord.js';
import { CommandHandler } from './utils/commandHandler';
import { EventHandler } from './utils/eventHandler';
import { GuildManager } from './utils/guildManager';
import * as dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

/**
 * Bot Discord com arquitetura de microserviços
 * Preparado para evoluir para microserviços Python
 */
class PochiBot {
  private client: Client;
  private commandHandler: CommandHandler;
  private eventHandler: EventHandler;
  private guildManager: GuildManager;

  constructor() {
    // Configuração do bot
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds
      ]
    });

    // Inicializa handlers
    this.commandHandler = new CommandHandler(this.client);
    this.eventHandler = new EventHandler(this.client);
    this.guildManager = new GuildManager();
    
    // Adiciona handlers ao client para acesso global
    (this.client as any).commandHandler = this.commandHandler;
    (this.client as any).guildManager = this.guildManager;
  }

  /**
   * Inicializa o bot
   */
  async start() {
    try {
      console.log('🚀 Iniciando Pochi Bot...');
      
      // Carrega eventos
      await this.eventHandler.loadEvents();
      console.log('✅ Eventos carregados');
      
      // Carrega comandos
      await this.commandHandler.loadCommands();
      console.log('✅ Comandos carregados');
      
      // Registra slash commands
      await this.commandHandler.registerSlashCommands();
      console.log('✅ Slash commands registrados');
      
      // Conecta ao Discord
      await this.client.login(process.env.DISCORD_TOKEN);
      
    } catch (error) {
      console.error('❌ Erro ao iniciar bot:', error);
      process.exit(1);
    }
  }

  /**
   * Para o bot
   */
  async stop() {
    console.log('🛑 Parando bot...');
    await this.client.destroy();
  }
}

// Tratamento de sinais para parada limpa
process.on('SIGINT', async () => {
  console.log('\n🛑 Recebido SIGINT, parando bot...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Recebido SIGTERM, parando bot...');
  process.exit(0);
});

// Inicia o bot
const bot = new PochiBot();
bot.start().catch(console.error);
