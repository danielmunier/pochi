/**
 * Exemplos de uso do WebhookService para diferentes cenários
 * Este arquivo demonstra como reutilizar o WebhookService em outros projetos
 */

import { WebhookService } from '../services/webhookService';

// ===== EXEMPLO 1: MICROSERVIÇO DE ECONOMIA =====
export class EconomyService {
  private webhookService: WebhookService;

  constructor(webhookUrl: string) {
    this.webhookService = new WebhookService(webhookUrl, {
      defaultUsername: 'Economy Service',
      defaultAvatarUrl: 'https://example.com/economy-icon.png'
    });
  }

  async processTransaction(userId: string, amount: number, type: 'deposit' | 'withdraw') {
    try {
      // Lógica de transação...
      
      // Notifica sucesso
      await this.webhookService.notifySuccess(
        `Transação de ${type} processada`,
        `Usuário: ${userId} | Valor: ${amount}`,
        'Economy Service'
      );
    } catch (error) {
      // Notifica erro
      await this.webhookService.notifyError(
        `Falha na transação: ${error}`,
        `Usuário: ${userId} | Tipo: ${type}`,
        'Economy Service'
      );
    }
  }
}

// ===== EXEMPLO 2: SISTEMA DE MONITORAMENTO =====
export class MonitoringService {
  private webhookService: WebhookService;

  constructor(webhookUrl: string) {
    this.webhookService = new WebhookService(webhookUrl, {
      defaultUsername: 'System Monitor',
      defaultAvatarUrl: 'https://example.com/monitor-icon.png'
    });
  }

  async checkServerHealth(serverName: string, status: 'online' | 'offline' | 'degraded') {
    const color = status === 'online' ? 0x00ff00 : status === 'offline' ? 0xff0000 : 0xffaa00;
    const emoji = status === 'online' ? '✅' : status === 'offline' ? '❌' : '⚠️';

    await this.webhookService.sendNotification({
      title: `${emoji} Status do Servidor`,
      description: `Servidor ${serverName} está ${status}`,
      color,
      fields: [
        {
          name: 'Servidor',
          value: serverName,
          inline: true
        },
        {
          name: 'Status',
          value: status.toUpperCase(),
          inline: true
        },
        {
          name: 'Timestamp',
          value: new Date().toISOString(),
          inline: true
        }
      ],
      footer: {
        text: 'System Monitor • Health Check'
      }
    });
  }
}

// ===== EXEMPLO 3: SISTEMA DE LOGS =====
export class LogService {
  private webhookService: WebhookService;

  constructor(webhookUrl: string) {
    this.webhookService = new WebhookService(webhookUrl, {
      defaultUsername: 'Log System',
      defaultAvatarUrl: 'https://example.com/log-icon.png'
    });
  }

  async logUserAction(userId: string, action: string, details?: any) {
    await this.webhookService.sendNotification({
      title: '👤 Ação do Usuário',
      description: `Usuário executou: ${action}`,
      color: 0x0099ff,
      fields: [
        {
          name: 'Usuário',
          value: `<@${userId}>`,
          inline: true
        },
        {
          name: 'Ação',
          value: action,
          inline: true
        },
        ...(details ? [{
          name: 'Detalhes',
          value: JSON.stringify(details, null, 2),
          inline: false
        }] : [])
      ]
    });
  }
}

// ===== EXEMPLO 4: SISTEMA DE BACKUP =====
export class BackupService {
  private webhookService: WebhookService;

  constructor(webhookUrl: string) {
    this.webhookService = new WebhookService(webhookUrl, {
      defaultUsername: 'Backup System',
      defaultAvatarUrl: 'https://example.com/backup-icon.png'
    });
  }

  async performBackup(databaseName: string) {
    try {
      // Lógica de backup...
      
      await this.webhookService.notifySuccess(
        `Backup do banco ${databaseName} concluído com sucesso`,
        `Tamanho: 2.5GB | Duração: 5min`,
        'Backup System'
      );
    } catch (error) {
      await this.webhookService.notifyError(
        `Falha no backup: ${error}`,
        `Banco: ${databaseName}`,
        'Backup System'
      );
    }
  }
}

// ===== EXEMPLO 5: SISTEMA DE DEPLOY =====
export class DeployService {
  private webhookService: WebhookService;

  constructor(webhookUrl: string) {
    this.webhookService = new WebhookService(webhookUrl, {
      defaultUsername: 'Deploy Bot',
      defaultAvatarUrl: 'https://example.com/deploy-icon.png'
    });
  }

  async deployApplication(appName: string, version: string, environment: string) {
    await this.webhookService.sendNotification({
      title: '🚀 Deploy Iniciado',
      description: `Aplicação ${appName} v${version} sendo deployada`,
      color: 0x0099ff,
      fields: [
        {
          name: 'Aplicação',
          value: appName,
          inline: true
        },
        {
          name: 'Versão',
          value: version,
          inline: true
        },
        {
          name: 'Ambiente',
          value: environment,
          inline: true
        }
      ]
    });

    // Simula processo de deploy...
    setTimeout(async () => {
      await this.webhookService.notifySuccess(
        `Deploy de ${appName} v${version} concluído`,
        `Ambiente: ${environment}`,
        'Deploy Bot'
      );
    }, 5000);
  }
}

// ===== EXEMPLO 6: SISTEMA DE PAGAMENTOS =====
export class PaymentService {
  private webhookService: WebhookService;

  constructor(webhookUrl: string) {
    this.webhookService = new WebhookService(webhookUrl, {
      defaultUsername: 'Payment Gateway',
      defaultAvatarUrl: 'https://example.com/payment-icon.png'
    });
  }

  async processPayment(transactionId: string, amount: number, currency: string, status: 'success' | 'failed') {
    const color = status === 'success' ? 0x00ff00 : 0xff0000;
    const emoji = status === 'success' ? '💳' : '❌';

    await this.webhookService.sendNotification({
      title: `${emoji} Pagamento ${status === 'success' ? 'Aprovado' : 'Rejeitado'}`,
      description: `Transação ${transactionId}`,
      color,
      fields: [
        {
          name: 'ID da Transação',
          value: transactionId,
          inline: true
        },
        {
          name: 'Valor',
          value: `${amount} ${currency}`,
          inline: true
        },
        {
          name: 'Status',
          value: status.toUpperCase(),
          inline: true
        }
      ]
    });
  }
}

// ===== EXEMPLO 7: MENSAGENS SIMPLES =====
export class SimpleNotificationService {
  private webhookService: WebhookService;

  constructor(webhookUrl: string) {
    this.webhookService = new WebhookService(webhookUrl, {
      defaultUsername: 'Notification Bot'
    });
  }

  async sendDailyReport() {
    await this.webhookService.sendMessage(
      '📊 **Relatório Diário**\n\n' +
      '• Usuários ativos: 1,234\n' +
      '• Vendas: R$ 5,678\n' +
      '• Erros: 3\n\n' +
      'Sistema funcionando normalmente! ✅'
    );
  }

  async sendAlert(message: string) {
    await this.webhookService.sendMessage(`🚨 **ALERTA**: ${message}`);
  }
}
