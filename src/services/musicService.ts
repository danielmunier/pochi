import { BaseService } from './baseService';

export interface PlayRequest {
  guild_id: string;
  channel_id: string;
  song: string;
  user_id: string;
}

export interface QueueItem {
  id: string;
  title: string;
  url: string;
  duration: number;
  user_id: string;
}

/**
 * Serviço de música - comunica com API Python
 */
export class MusicService extends BaseService {
  constructor(baseURL: string = process.env.MUSIC_SERVICE_URL || 'http://localhost:8002') {
    super(baseURL);
  }

  /**
   * Toca uma música
   */
  async playSong(request: PlayRequest) {
    return await this.post('/play', request);
  }

  /**
   * Para a música atual
   */
  async stopMusic(guildId: string) {
    return await this.post('/stop', { guild_id: guildId });
  }

  /**
   * Pausa a música atual
   */
  async pauseMusic(guildId: string) {
    return await this.post('/pause', { guild_id: guildId });
  }

  /**
   * Resume a música pausada
   */
  async resumeMusic(guildId: string) {
    return await this.post('/resume', { guild_id: guildId });
  }

  /**
   * Pula para a próxima música
   */
  async skipMusic(guildId: string, userId: string) {
    return await this.post('/skip', { guild_id: guildId, user_id: userId });
  }

  /**
   * Pega a fila de músicas
   */
  async getQueue(guildId: string) {
    return await this.get(`/queue?guild_id=${guildId}`);
  }

  /**
   * Limpa a fila de músicas
   */
  async clearQueue(guildId: string) {
    return await this.post('/queue/clear', { guild_id: guildId });
  }

  /**
   * Remove música específica da fila
   */
  async removeFromQueue(guildId: string, position: number) {
    return await this.delete(`/queue/${position}?guild_id=${guildId}`);
  }

  /**
   * Pega informações da música atual
   */
  async getCurrentSong(guildId: string) {
    return await this.get(`/current?guild_id=${guildId}`);
  }

  /**
   * Define volume
   */
  async setVolume(guildId: string, volume: number) {
    return await this.post('/volume', { guild_id: guildId, volume });
  }

  /**
   * Pega volume atual
   */
  async getVolume(guildId: string) {
    return await this.get(`/volume?guild_id=${guildId}`);
  }
}
