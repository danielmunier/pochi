import { Client, Events } from 'discord.js';
import { Event } from '../types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Handler automático para eventos do Discord
 * Carrega automaticamente todos os eventos das pastas
 */
export class EventHandler {
  constructor(private client: Client) {}

  /**
   * Carrega todos os eventos das pastas
   */
  async loadEvents(): Promise<void> {
    const eventsPath = path.join(__dirname, '../events');
    
    if (!fs.existsSync(eventsPath)) {
      console.log('📁 Pasta de eventos não encontrada, criando...');
      fs.mkdirSync(eventsPath, { recursive: true });
      return;
    }

    const eventFiles = fs.readdirSync(eventsPath).filter(file => 
      (file.endsWith('.ts') || file.endsWith('.js')) && !file.endsWith('.d.ts')
    );
    
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      
      try {
        const event: Event = require(filePath);
        
        if ('name' in event && 'execute' in event) {
          if (event.once) {
            this.client.once(event.name, (...args) => event.execute(...args));
          } else {
            this.client.on(event.name, (...args) => event.execute(...args));
          }
          
          console.log(`✅ Evento carregado: ${event.name}`);
        } else {
          console.log(`⚠️ Evento ${file} não tem propriedades 'name' ou 'execute'`);
        }
      } catch (error) {
        console.error(`❌ Erro ao carregar evento ${file}:`, error);
      }
    }
    
    console.log(`📊 Total de eventos carregados: ${eventFiles.length}`);
  }
}
