import { BaseService } from './baseService';

export interface BanRequest {
  user_id: string;
  guild_id: string;
  moderator_id: string;
  reason?: string;
}

export interface KickRequest {
  user_id: string;
  guild_id: string;
  moderator_id: string;
  reason?: string;
}

export interface MuteRequest {
  user_id: string;
  guild_id: string;
  moderator_id: string;
  duration?: number; // em minutos
  reason?: string;
}

/**
 * Serviço de moderação - comunica com API Python
 */
export class ModerationService extends BaseService {
  constructor(baseURL: string = process.env.MODERATION_SERVICE_URL || 'http://localhost:8001') {
    super(baseURL);
  }

  /**
   * Bane um usuário
   */
  async banUser(request: BanRequest) {
    return await this.post('/ban', request);
  }

  /**
   * Expulsa um usuário
   */
  async kickUser(request: KickRequest) {
    return await this.post('/kick', request);
  }

  /**
   * Silencia um usuário
   */
  async muteUser(request: MuteRequest) {
    return await this.post('/mute', request);
  }

  /**
   * Remove silêncio de um usuário
   */
  async unmuteUser(userId: string, guildId: string, moderatorId: string) {
    return await this.post('/unmute', {
      user_id: userId,
      guild_id: guildId,
      moderator_id: moderatorId
    });
  }

  /**
   * Adiciona aviso a um usuário
   */
  async warnUser(userId: string, guildId: string, moderatorId: string, reason: string) {
    return await this.post('/warn', {
      user_id: userId,
      guild_id: guildId,
      moderator_id: moderatorId,
      reason
    });
  }

  /**
   * Pega avisos de um usuário
   */
  async getUserWarnings(userId: string, guildId: string) {
    return await this.get(`/warnings/${userId}?guild_id=${guildId}`);
  }

  /**
   * Remove aviso de um usuário
   */
  async removeWarning(warningId: string, moderatorId: string) {
    return await this.delete(`/warnings/${warningId}?moderator_id=${moderatorId}`);
  }
}
