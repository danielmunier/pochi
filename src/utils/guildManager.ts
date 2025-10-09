/**
 * Gerenciador de configurações por servidor
 * Permite que cada servidor tenha suas próprias configurações
 */
export class GuildManager {
  private guildConfigs: Map<string, GuildConfig> = new Map();
  private guildStats: Map<string, GuildStats> = new Map();

  /**
   * Pega configuração de um servidor
   */
  getGuildConfig(guildId: string): GuildConfig {
    if (!this.guildConfigs.has(guildId)) {
      // Configuração padrão para novos servidores
      this.guildConfigs.set(guildId, {
        guildId,
        prefix: '!',
        language: 'pt-BR',
        moderation: {
          enabled: true,
          logChannel: null,
          autoMod: false
        },
        music: {
          enabled: true,
          defaultVolume: 50
        },
        economy: {
          enabled: true,
          currency: 'moedas',
          dailyReward: 100
        }
      });
    }
    return this.guildConfigs.get(guildId)!;
  }

  /**
   * Atualiza configuração de um servidor
   */
  updateGuildConfig(guildId: string, config: Partial<GuildConfig>): void {
    const currentConfig = this.getGuildConfig(guildId);
    this.guildConfigs.set(guildId, { ...currentConfig, ...config });
  }

  /**
   * Pega estatísticas de um servidor
   */
  getGuildStats(guildId: string): GuildStats {
    if (!this.guildStats.has(guildId)) {
      this.guildStats.set(guildId, {
        guildId,
        commandsExecuted: 0,
        usersJoined: 0,
        usersBanned: 0,
        messagesProcessed: 0,
        lastActivity: new Date()
      });
    }
    return this.guildStats.get(guildId)!;
  }

  /**
   * Incrementa estatística de um servidor
   */
  incrementGuildStat(guildId: string, stat: keyof GuildStats): void {
    const stats = this.getGuildStats(guildId);
    if (typeof stats[stat] === 'number') {
      (stats[stat] as number)++;
    }
    stats.lastActivity = new Date();
  }

  /**
   * Lista todos os servidores ativos
   */
  getActiveGuilds(): string[] {
    return Array.from(this.guildConfigs.keys());
  }

  /**
   * Remove dados de um servidor (quando o bot sai)
   */
  removeGuild(guildId: string): void {
    this.guildConfigs.delete(guildId);
    this.guildStats.delete(guildId);
  }
}

// Interfaces
export interface GuildConfig {
  guildId: string;
  prefix: string;
  language: string;
  moderation: {
    enabled: boolean;
    logChannel: string | null;
    autoMod: boolean;
  };
  music: {
    enabled: boolean;
    defaultVolume: number;
  };
  economy: {
    enabled: boolean;
    currency: string;
    dailyReward: number;
  };
}

export interface GuildStats {
  guildId: string;
  commandsExecuted: number;
  usersJoined: number;
  usersBanned: number;
  messagesProcessed: number;
  lastActivity: Date;
}
