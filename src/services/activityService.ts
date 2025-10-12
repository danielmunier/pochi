import { Client, ActivityType } from 'discord.js';

interface BotStats {
  guilds: number;
  members: number;
}

export class ActivityService {
  private client: Client;
  private updateTimeout: NodeJS.Timeout | null = null;
  private lastUpdate: number = 0;
  private readonly THROTTLE_MS = 30000; // 30 segundos de throttling
  private lastStats: BotStats | null = null;
  private pendingUpdate = false;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Atualiza a atividade do bot mostrando servidores e membros
   */
  public updateActivity(force = false): void {
    const now = Date.now();
    const currentStats = this.getCurrentStats();
    
    // Se não for forçado, verifica se há mudança significativa
    if (!force) {
      // Se não há mudança significativa, não atualiza
      if (this.lastStats && this.isStatsSimilar(this.lastStats, currentStats)) {
        console.log('📊 Sem mudança significativa, pulando atualização da atividade');
        return;
      }
      
      // Throttling: só atualiza se passou o tempo mínimo
      if (now - this.lastUpdate < this.THROTTLE_MS) {
        if (!this.pendingUpdate) {
          this.pendingUpdate = true;
          console.log(`⏳ Agendando atualização da atividade em ${Math.ceil((this.THROTTLE_MS - (now - this.lastUpdate)) / 1000)}s`);
        }
        
        if (this.updateTimeout) {
          clearTimeout(this.updateTimeout);
        }
        
        this.updateTimeout = setTimeout(() => {
          this.pendingUpdate = false;
          this.updateActivity(true);
        }, this.THROTTLE_MS - (now - this.lastUpdate));
        
        return;
      }
    }

    this.lastUpdate = now;
    this.pendingUpdate = false;
    
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = null;
    }

    // Atualiza cache de estatísticas
    this.lastStats = currentStats;
    
    // Atividade fixa: servidores e membros
    const activityText = `${currentStats.guilds} servidor${currentStats.guilds !== 1 ? 'es' : ''} • ${currentStats.members.toLocaleString('pt-BR')} membros`;

    this.client.user?.setActivity(activityText, { type: ActivityType.Watching });
    
    console.log(`🎯 Atividade atualizada: ${activityText}`);
  }

  /**
   * Verifica se as estatísticas são similares (evita atualizações desnecessárias)
   */
  private isStatsSimilar(oldStats: BotStats, newStats: BotStats): boolean {
    // Só atualiza se mudou pelo menos 1 servidor ou 10 membros
    const guildDiff = Math.abs(newStats.guilds - oldStats.guilds);
    const memberDiff = Math.abs(newStats.members - oldStats.members);
    
    return guildDiff === 0 && memberDiff < 10;
  }

  /**
   * Obtém estatísticas atuais do bot
   */
  private getCurrentStats(): BotStats {
    const guildCount = this.client.guilds.cache.size;
    const totalMembers = this.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    
    return {
      guilds: guildCount,
      members: totalMembers
    };
  }

  /**
   * Força atualização imediata da atividade
   */
  public forceUpdate(): void {
    this.updateActivity(true);
  }

  /**
   * Obtém estatísticas atuais do bot (método público)
   */
  public getStats(): BotStats {
    return this.getCurrentStats();
  }

  /**
   * Obtém informações de performance do sistema
   */
  public getPerformanceInfo(): {
    lastUpdate: number;
    pendingUpdate: boolean;
    throttleRemaining: number;
  } {
    const now = Date.now();
    return {
      lastUpdate: this.lastUpdate,
      pendingUpdate: this.pendingUpdate,
      throttleRemaining: Math.max(0, this.THROTTLE_MS - (now - this.lastUpdate))
    };
  }
}
