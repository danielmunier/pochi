import axios from 'axios';

// Interfaces para tipagem
export interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  footer?: {
    text: string;
    icon_url?: string;
  };
  timestamp?: string;
}

export interface WebhookPayload {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: DiscordEmbed[];
}

export interface NotificationOptions {
  title?: string;
  description?: string;
  color?: number;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  thumbnail?: string;
  image?: string;
  footer?: {
    text: string;
    icon_url?: string;
  };
  username?: string;
  avatar_url?: string;
}

/**
 * Serviço genérico de webhook para Discord
 * Reutilizável para qualquer tipo de notificação
 */
export class WebhookService {
  private webhookUrl: string;
  private defaultUsername: string;
  private defaultAvatarUrl: string;

  constructor(webhookUrl: string, options?: {
    defaultUsername?: string;
    defaultAvatarUrl?: string;
  }) {
    this.webhookUrl = webhookUrl;
    this.defaultUsername = options?.defaultUsername || 'Pochi Bot';
    this.defaultAvatarUrl = options?.defaultAvatarUrl || '';
  }

  /**
   * Envia uma notificação genérica via webhook
   */
  async sendNotification(options: NotificationOptions): Promise<boolean> {
    if (!this.webhookUrl) {
      console.log('⚠️ Webhook URL não configurada, pulando notificação');
      return false;
    }

    try {
      const embed: DiscordEmbed = {
        title: options.title,
        description: options.description,
        color: options.color || 0x0099ff, // Azul padrão
        fields: options.fields,
        timestamp: new Date().toISOString()
      };

      if (options.thumbnail) {
        embed.thumbnail = { url: options.thumbnail };
      }

      if (options.image) {
        embed.image = { url: options.image };
      }

      if (options.footer) {
        embed.footer = options.footer;
      }

      const payload: WebhookPayload = {
        embeds: [embed],
        username: options.username || this.defaultUsername,
        avatar_url: options.avatar_url || this.defaultAvatarUrl
      };

      await axios.post(this.webhookUrl, payload);
      console.log(`📤 Notificação enviada: ${options.title || 'Sem título'}`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar notificação:', error);
      return false;
    }
  }

  /**
   * Envia uma mensagem simples de texto
   */
  async sendMessage(content: string, options?: {
    username?: string;
    avatar_url?: string;
  }): Promise<boolean> {
    if (!this.webhookUrl) {
      console.log('⚠️ Webhook URL não configurada, pulando mensagem');
      return false;
    }

    try {
      const payload: WebhookPayload = {
        content,
        username: options?.username || this.defaultUsername,
        avatar_url: options?.avatar_url || this.defaultAvatarUrl
      };

      await axios.post(this.webhookUrl, payload);
      console.log(`📤 Mensagem enviada: ${content.substring(0, 50)}...`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao enviar mensagem:', error);
      return false;
    }
  }

  /**
   * Envia notificação de erro genérica
   */
  async notifyError(error: string, context?: string, service?: string): Promise<boolean> {
    return this.sendNotification({
      title: `❌ Erro${service ? ` em ${service}` : ''}`,
      color: 0xff0000, // Vermelho
      fields: [
        {
          name: 'Erro',
          value: error,
          inline: false
        },
        ...(context ? [{
          name: 'Contexto',
          value: context,
          inline: false
        }] : [])
      ],
      footer: {
        text: `${this.defaultUsername} • ${new Date().toLocaleString('pt-BR')}`
      }
    });
  }

  /**
   * Envia notificação de sucesso
   */
  async notifySuccess(message: string, context?: string, service?: string): Promise<boolean> {
    return this.sendNotification({
      title: `✅ Sucesso${service ? ` em ${service}` : ''}`,
      description: message,
      color: 0x00ff00, // Verde
      fields: context ? [{
        name: 'Contexto',
        value: context,
        inline: false
      }] : undefined,
      footer: {
        text: `${this.defaultUsername} • ${new Date().toLocaleString('pt-BR')}`
      }
    });
  }

  /**
   * Envia notificação de aviso
   */
  async notifyWarning(message: string, context?: string, service?: string): Promise<boolean> {
    return this.sendNotification({
      title: `⚠️ Aviso${service ? ` em ${service}` : ''}`,
      description: message,
      color: 0xffaa00, // Amarelo
      fields: context ? [{
        name: 'Contexto',
        value: context,
        inline: false
      }] : undefined,
      footer: {
        text: `${this.defaultUsername} • ${new Date().toLocaleString('pt-BR')}`
      }
    });
  }

  /**
   * Envia notificação de informação
   */
  async notifyInfo(message: string, context?: string, service?: string): Promise<boolean> {
    return this.sendNotification({
      title: `ℹ️ Informação${service ? ` de ${service}` : ''}`,
      description: message,
      color: 0x0099ff, // Azul
      fields: context ? [{
        name: 'Contexto',
        value: context,
        inline: false
      }] : undefined,
      footer: {
        text: `${this.defaultUsername} • ${new Date().toLocaleString('pt-BR')}`
      }
    });
  }

  // ===== MÉTODOS ESPECÍFICOS PARA DISCORD BOT =====

  /**
   * Envia notificação de servidor adicionado (Discord Bot)
   */
  async notifyGuildJoined(guild: any): Promise<boolean> {
    return this.sendNotification({
      title: '🎉 Bot Adicionado ao Servidor',
      color: 0x00ff00, // Verde
      fields: [
        {
          name: 'Servidor',
          value: guild.name,
          inline: true
        },
        {
          name: 'ID',
          value: guild.id,
          inline: true
        },
        {
          name: 'Membros',
          value: guild.memberCount?.toString() || 'N/A',
          inline: true
        },
        {
          name: 'Dono',
          value: guild.ownerId ? `<@${guild.ownerId}>` : 'N/A',
          inline: true
        },
        {
          name: 'Região',
          value: guild.preferredLocale || 'N/A',
          inline: true
        },
        {
          name: 'Criado em',
          value: guild.createdAt ? `<t:${Math.floor(guild.createdAt.getTime() / 1000)}:F>` : 'N/A',
          inline: true
        }
      ],
      thumbnail: guild.iconURL() || undefined,
      footer: {
        text: `${this.defaultUsername} • ${new Date().toLocaleString('pt-BR')}`,
        icon_url: guild.client?.user?.displayAvatarURL()
      }
    });
  }

  /**
   * Envia notificação de servidor removido (Discord Bot)
   */
  async notifyGuildLeft(guild: any): Promise<boolean> {
    return this.sendNotification({
      title: '👋 Bot Removido do Servidor',
      color: 0xff0000, // Vermelho
      fields: [
        {
          name: 'Servidor',
          value: guild.name,
          inline: true
        },
        {
          name: 'ID',
          value: guild.id,
          inline: true
        },
        {
          name: 'Membros',
          value: guild.memberCount?.toString() || 'N/A',
          inline: true
        }
      ],
      thumbnail: guild.iconURL() || undefined,
      footer: {
        text: `${this.defaultUsername} • ${new Date().toLocaleString('pt-BR')}`,
        icon_url: guild.client?.user?.displayAvatarURL()
      }
    });
  }
}
