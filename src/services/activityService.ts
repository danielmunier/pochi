import { Client, ActivityType } from 'discord.js';

interface ActivityConfig {
  name: string;
  type: ActivityType;
  emoji?: string;
}

interface BotStats {
  guilds: number;
  members: number;
}

export class ActivityService {
  private client: Client;
  private updateTimeout: NodeJS.Timeout | null = null;
  private lastUpdate: number = 0;
  private readonly THROTTLE_MS = 30000; // 30 segundos de throttling (muito mais conservador)
  private activityIndex = 0;
  private lastStats: BotStats | null = null;
  private pendingUpdate = false;
  
  private readonly activities: ActivityConfig[] = [
    { name: 'servidores', type: ActivityType.Watching, emoji: '🚀' },
    { name: 'membros', type: ActivityType.Watching, emoji: '👥' },
    { name: 'comandos', type: ActivityType.Listening, emoji: '🎵' },
    { name: 'música', type: ActivityType.Playing, emoji: '🎶' }
  ];

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Atualiza a atividade do bot com throttling agressivo e detecção de mudanças
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
    
    // Rotaciona entre diferentes tipos de atividade
    const activity = this.activities[this.activityIndex];
    this.activityIndex = (this.activityIndex + 1) % this.activities.length;

    let activityText = '';
    
    switch (activity.name) {
      case 'servidores':
        activityText = `${currentStats.guilds} servidor${currentStats.guilds !== 1 ? 'es' : ''} ${activity.emoji}`;
        break;
      case 'membros':
        activityText = `${currentStats.members.toLocaleString('pt-BR')} membros ${activity.emoji}`;
        break;
      case 'comandos':
        activityText = `comandos em ${currentStats.guilds} servidor${currentStats.guilds !== 1 ? 'es' : ''} ${activity.emoji}`;
        break;
      case 'música':
        activityText = `música em ${currentStats.guilds} servidor${currentStats.guilds !== 1 ? 'es' : ''} ${activity.emoji}`;
        break;
    }

    this.client.user?.setActivity(activityText, { type: activity.type });
    
    console.log(`🎯 Atividade atualizada: ${activityText} (${currentStats.guilds} servidores, ${currentStats.members} membros)`);
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
   * Inicia rotação automática de atividades (opcional)
   */
  public startRotation(intervalMs = 30000): void {
    setInterval(() => {
      this.updateActivity(true);
    }, intervalMs);
  }

  /**
   * Para a rotação automática
   */
  public stopRotation(): void {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = null;
    }
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
