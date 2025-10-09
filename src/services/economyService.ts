import { BaseService } from './baseService';

export interface UserBalance {
  user_id: string;
  guild_id: string;
  balance: number;
  level: number;
  xp: number;
}

export interface TransferRequest {
  from_user_id: string;
  to_user_id: string;
  guild_id: string;
  amount: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

/**
 * Serviço de economia - comunica com API Python
 */
export class EconomyService extends BaseService {
  constructor(baseURL: string = process.env.ECONOMY_SERVICE_URL || 'http://localhost:8003') {
    super(baseURL);
  }

  /**
   * Pega saldo de um usuário
   */
  async getUserBalance(userId: string, guildId: string) {
    return await this.get(`/balance/${userId}?guild_id=${guildId}`);
  }

  /**
   * Adiciona dinheiro a um usuário
   */
  async addMoney(userId: string, guildId: string, amount: number, reason?: string) {
    return await this.post('/balance/add', {
      user_id: userId,
      guild_id: guildId,
      amount,
      reason
    });
  }

  /**
   * Remove dinheiro de um usuário
   */
  async removeMoney(userId: string, guildId: string, amount: number, reason?: string) {
    return await this.post('/balance/remove', {
      user_id: userId,
      guild_id: guildId,
      amount,
      reason
    });
  }

  /**
   * Transfere dinheiro entre usuários
   */
  async transferMoney(request: TransferRequest) {
    return await this.post('/transfer', request);
  }

  /**
   * Recompensa diária
   */
  async dailyReward(userId: string, guildId: string) {
    return await this.post('/daily', {
      user_id: userId,
      guild_id: guildId
    });
  }

  /**
   * Pega ranking de usuários
   */
  async getLeaderboard(guildId: string, limit: number = 10) {
    return await this.get(`/leaderboard?guild_id=${guildId}&limit=${limit}`);
  }

  /**
   * Pega itens da loja
   */
  async getShopItems(guildId: string, category?: string) {
    const url = category 
      ? `/shop?guild_id=${guildId}&category=${category}`
      : `/shop?guild_id=${guildId}`;
    return await this.get(url);
  }

  /**
   * Compra um item da loja
   */
  async buyItem(userId: string, guildId: string, itemId: string) {
    return await this.post('/shop/buy', {
      user_id: userId,
      guild_id: guildId,
      item_id: itemId
    });
  }

  /**
   * Pega inventário de um usuário
   */
  async getUserInventory(userId: string, guildId: string) {
    return await this.get(`/inventory/${userId}?guild_id=${guildId}`);
  }

  /**
   * Adiciona XP a um usuário
   */
  async addXP(userId: string, guildId: string, amount: number, reason?: string) {
    return await this.post('/xp/add', {
      user_id: userId,
      guild_id: guildId,
      amount,
      reason
    });
  }

  /**
   * Pega informações de level de um usuário
   */
  async getUserLevel(userId: string, guildId: string) {
    return await this.get(`/level/${userId}?guild_id=${guildId}`);
  }
}
