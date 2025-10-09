import { Collection, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Handler automático para comandos slash
 * Carrega automaticamente todos os comandos das pastas
 */
export class CommandHandler {
  private commands: Collection<string, Command> = new Collection();

  constructor(private client: any) {
    this.client.commands = this.commands;
  }

  /**
   * Carrega todos os comandos das pastas
   */
  async loadCommands(): Promise<void> {
    const commandsPath = path.join(__dirname, '../commands');
    
    if (!fs.existsSync(commandsPath)) {
      console.log('📁 Pasta de comandos não encontrada, criando...');
      fs.mkdirSync(commandsPath, { recursive: true });
      return;
    }

    const commandFolders = fs.readdirSync(commandsPath);
    let loadedCount = 0;
    let failedCount = 0;
    
    for (const folder of commandFolders) {
      const folderPath = path.join(commandsPath, folder);
      
      if (!fs.statSync(folderPath).isDirectory()) continue;
      
      const commandFiles = fs.readdirSync(folderPath).filter(file => 
        (file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts')
      );
      
      for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        
        try {
          const command: Command = require(filePath);
          
          if ('data' in command && 'execute' in command) {
            this.commands.set(command.data.name, command);
            loadedCount++;
          } else {
            console.log(`⚠️ Comando ${file} não tem propriedades 'data' ou 'execute'`);
            failedCount++;
          }
        } catch (error) {
          console.error(`❌ Erro ao carregar comando ${file}:`, error);
          failedCount++;
        }
      }
    }
    
    console.log(`📊 Comandos: ${loadedCount} carregados, ${failedCount} falharam`);
  }

  /**
   * Registra todos os comandos no Discord
   */
  async registerSlashCommands(): Promise<void> {
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v9');
    
    // Verifica se as variáveis necessárias estão definidas
    if (!process.env.DISCORD_TOKEN) {
      console.error('❌ DISCORD_TOKEN não definido no .env');
      return;
    }
    
    if (!process.env.CLIENT_ID) {
      console.error('❌ CLIENT_ID não definido no .env');
      return;
    }
    
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
    
    const commands = Array.from(this.commands.values()).map(command => command.data.toJSON());
    
    if (commands.length === 0) {
      console.log('⚠️ Nenhum comando encontrado para registrar');
      return;
    }
    
    try {
      console.log('🔄 Registrando slash commands...');
      
      if (process.env.GUILD_ID) {
        // Registra apenas no servidor específico (desenvolvimento)
        console.log(`📡 Registrando ${commands.length} comandos no servidor ${process.env.GUILD_ID}`);
        await rest.put(
          Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
          { body: commands }
        );
        console.log('✅ Slash commands registrados no servidor de desenvolvimento!');
      } else {
        // Registra globalmente (produção)
        console.log(`📡 Registrando ${commands.length} comandos globalmente`);
        await rest.put(
          Routes.applicationCommands(process.env.CLIENT_ID),
          { body: commands }
        );
        console.log('✅ Slash commands registrados globalmente!');
      }
    } catch (error: any) {
      console.error('❌ Erro ao registrar commands:');
      console.error('Código:', error.code);
      console.error('Status:', error.status);
      console.error('Mensagem:', error.message);
      
      if (error.code === 50001) {
        console.error('💡 Solução: Verifique se o bot tem permissão "applications.commands"');
        console.error('💡 Vá em Discord Developer Portal > OAuth2 > URL Generator');
        console.error('💡 Selecione "applications.commands" e adicione o bot novamente');
      }
    }
  }

  /**
   * Handler para interações de comandos
   */
  async handleInteraction(interaction: ChatInputCommandInteraction): Promise<void> {
    const command = this.commands.get(interaction.commandName);
    
    if (!command) {
      console.error(`❌ Comando ${interaction.commandName} não encontrado`);
      return;
    }
    
    try {
      await command.execute(interaction);
      console.log(`✅ Comando ${interaction.commandName} executado por ${interaction.user.username}`);
    } catch (error) {
      console.error(`❌ Erro ao executar comando ${interaction.commandName}:`, error);
      
      const errorMessage = '❌ Erro ao executar comando!';
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    }
  }
}
