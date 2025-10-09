import { Client, TextChannel, EmbedBuilder, Colors, Guild, User, VoiceChannel, Message } from 'discord.js';

export interface GuildLogConfig {
  guildId: string;
  logChannelId: string;
  enabledEvents: {
    memberJoin: boolean;
    memberLeave: boolean;
    memberUpdate: boolean;
    voiceJoin: boolean;
    voiceLeave: boolean;
    voiceMove: boolean;
    messageDelete: boolean;
    messageUpdate: boolean;
    messageReaction: boolean;
  };
}

export class LoggingService {
  private client: Client;
  private guildConfigs: Map<string, GuildLogConfig> = new Map();

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Configura o canal de logs para uma guild
   */
  async setLogChannel(guildId: string, channelId: string): Promise<boolean> {
    try {
      const guild = this.client.guilds.cache.get(guildId);
      if (!guild) return false;

      const channel = guild.channels.cache.get(channelId);
      if (!channel || !channel.isTextBased()) return false;

      // Verifica se o bot tem permissão para enviar mensagens no canal
      const permissions = channel.permissionsFor(guild.members.me!);
      if (!permissions?.has('SendMessages')) return false;

      const config: GuildLogConfig = {
        guildId,
        logChannelId: channelId,
        enabledEvents: {
          memberJoin: true,
          memberLeave: true,
          memberUpdate: true,
          voiceJoin: true,
          voiceLeave: true,
          voiceMove: true,
          messageDelete: true,
          messageUpdate: true,
          messageReaction: true
        }
      };

      this.guildConfigs.set(guildId, config);
      return true;
    } catch (error) {
      console.error(`Erro ao configurar canal de logs para guild ${guildId}:`, error);
      return false;
    }
  }

  /**
   * Obtém a configuração de logs de uma guild
   */
  getGuildConfig(guildId: string): GuildLogConfig | undefined {
    return this.guildConfigs.get(guildId);
  }

  /**
   * Verifica se um evento está habilitado para uma guild
   */
  isEventEnabled(guildId: string, event: keyof GuildLogConfig['enabledEvents']): boolean {
    const config = this.guildConfigs.get(guildId);
    return config?.enabledEvents[event] ?? false;
  }

  /**
   * Verifica se o canal de logs está funcionando corretamente
   */
  async testLogChannel(guildId: string): Promise<{ success: boolean; message: string; details?: any }> {
    const config = this.guildConfigs.get(guildId);
    if (!config) {
      return { success: false, message: 'Canal de logs não configurado' };
    }

    try {
      const guild = this.client.guilds.cache.get(guildId);
      if (!guild) {
        return { success: false, message: 'Guild não encontrada no cache' };
      }

      const channel = guild.channels.cache.get(config.logChannelId) as TextChannel;
      if (!channel) {
        return { success: false, message: 'Canal de logs não encontrado' };
      }

      if (!channel.isTextBased()) {
        return { success: false, message: 'Canal não é um canal de texto' };
      }

      const botMember = guild.members.me;
      if (!botMember) {
        return { success: false, message: 'Bot não é membro da guild' };
      }

      const permissions = channel.permissionsFor(botMember);
      if (!permissions) {
        return { success: false, message: 'Não foi possível verificar permissões' };
      }

      const hasSendMessages = permissions.has('SendMessages');
      const hasEmbedLinks = permissions.has('EmbedLinks');
      const hasViewChannel = permissions.has('ViewChannel');

      if (!hasViewChannel) {
        return { success: false, message: 'Bot não pode ver o canal' };
      }

      if (!hasSendMessages) {
        return { success: false, message: 'Bot não pode enviar mensagens no canal' };
      }

      if (!hasEmbedLinks) {
        return { success: false, message: 'Bot não pode enviar embeds no canal' };
      }

      // Testa enviando uma mensagem de teste
      const testEmbed = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setTitle('🧪 Teste de Logs')
        .setDescription('Este é um teste do sistema de logs')
        .addFields(
          { name: '✅ Status', value: 'Canal de logs funcionando corretamente', inline: true },
          { name: '📅 Testado em', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
        )
        .setTimestamp();

      await channel.send({ embeds: [testEmbed] });

      return { 
        success: true, 
        message: 'Canal de logs funcionando perfeitamente',
        details: {
          channelName: channel.name,
          guildName: guild.name,
          permissions: permissions.toArray()
        }
      };

    } catch (error: any) {
      return { 
        success: false, 
        message: `Erro ao testar canal: ${error.message}`,
        details: { errorCode: error.code, errorMessage: error.message }
      };
    }
  }

  /**
   * Envia uma mensagem de log para a guild
   */
  private async sendLogMessage(guildId: string, embed: EmbedBuilder): Promise<void> {
    const config = this.guildConfigs.get(guildId);
    if (!config) {
      console.log(`⚠️ Configuração de logs não encontrada para guild ${guildId}`);
      return;
    }

    try {
      const guild = this.client.guilds.cache.get(guildId);
      if (!guild) {
        console.log(`⚠️ Guild ${guildId} não encontrada no cache`);
        return;
      }

      const channel = guild.channels.cache.get(config.logChannelId) as TextChannel;
      if (!channel) {
        console.log(`⚠️ Canal de logs ${config.logChannelId} não encontrado na guild ${guild.name}`);
        return;
      }

      // Verifica se o canal ainda é um canal de texto
      if (!channel.isTextBased()) {
        console.log(`⚠️ Canal ${(channel as any).name || 'desconhecido'} não é um canal de texto na guild ${guild.name}`);
        return;
      }

      // Verifica permissões antes de enviar
      const botMember = guild.members.me;
      if (!botMember) {
        console.log(`⚠️ Bot não é membro da guild ${guild.name}`);
        return;
      }

      const permissions = channel.permissionsFor(botMember);
      if (!permissions) {
        console.log(`⚠️ Não foi possível verificar permissões no canal ${channel.name} da guild ${guild.name}`);
        return;
      }

      if (!permissions.has('SendMessages')) {
        console.log(`❌ Bot não tem permissão para enviar mensagens no canal ${channel.name} da guild ${guild.name}`);
        console.log(`   Permissões necessárias: SendMessages`);
        console.log(`   Permissões atuais: ${permissions.toArray().join(', ')}`);
        return;
      }

      if (!permissions.has('EmbedLinks')) {
        console.log(`⚠️ Bot não tem permissão para enviar embeds no canal ${channel.name} da guild ${guild.name}`);
        console.log(`   Permissões necessárias: SendMessages, EmbedLinks`);
        console.log(`   Permissões atuais: ${permissions.toArray().join(', ')}`);
        return;
      }

      await channel.send({ embeds: [embed] });
      console.log(`✅ Log enviado com sucesso para ${guild.name} -> ${channel.name}`);
      
    } catch (error: any) {
      console.error(`❌ Erro ao enviar log para guild ${guildId}:`);
      
      if (error.code === 50013) {
        console.error(`   🚫 ERRO DE PERMISSÃO: Bot não tem permissão para enviar mensagens`);
        console.error(`   📍 Guild: ${guildId}`);
        console.error(`   📍 Canal: ${config.logChannelId}`);
        console.error(`   💡 Solução: Verifique as permissões do bot no canal de logs`);
      } else if (error.code === 50001) {
        console.error(`   🚫 ERRO DE PERMISSÃO: Bot não tem permissão para acessar o canal`);
        console.error(`   📍 Guild: ${guildId}`);
        console.error(`   📍 Canal: ${config.logChannelId}`);
        console.error(`   💡 Solução: Verifique se o bot pode ver o canal de logs`);
      } else if (error.code === 10003) {
        console.error(`   🚫 CANAL NÃO ENCONTRADO: Canal de logs foi deletado`);
        console.error(`   📍 Guild: ${guildId}`);
        console.error(`   📍 Canal: ${config.logChannelId}`);
        console.error(`   💡 Solução: Reconfigure o canal de logs com /setlogchannel`);
      } else if (error.code === 10004) {
        console.error(`   🚫 GUILD NÃO ENCONTRADA: Bot foi removido da guild`);
        console.error(`   📍 Guild: ${guildId}`);
        console.error(`   💡 Solução: Reconvide o bot para a guild`);
      } else {
        console.error(`   🔍 Código do erro: ${error.code || 'Desconhecido'}`);
        console.error(`   📝 Mensagem: ${error.message}`);
        console.error(`   📍 Guild: ${guildId}`);
        console.error(`   📍 Canal: ${config.logChannelId}`);
      }
      
      // Remove configuração inválida se for erro de permissão permanente
      if (error.code === 10003 || error.code === 10004) {
        console.log(`🗑️ Removendo configuração inválida para guild ${guildId}`);
        this.guildConfigs.delete(guildId);
      }
    }
  }

  /**
   * Log de entrada de membro
   */
  async logMemberJoin(guild: Guild, user: User): Promise<void> {
    if (!this.isEventEnabled(guild.id, 'memberJoin')) return;

    const embed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setTitle('👋 Membro Entrou')
      .setDescription(`**${user.tag}** entrou no servidor`)
      .addFields(
        { name: '👤 Usuário', value: `${user} (${user.id})`, inline: true },
        { name: '📅 Conta criada', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '📊 Total de membros', value: guild.memberCount.toString(), inline: true }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    await this.sendLogMessage(guild.id, embed);
  }

  /**
   * Log de saída de membro
   */
  async logMemberLeave(guild: Guild, user: User): Promise<void> {
    if (!this.isEventEnabled(guild.id, 'memberLeave')) return;

    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setTitle('👋 Membro Saiu')
      .setDescription(`**${user.tag}** saiu do servidor`)
      .addFields(
        { name: '👤 Usuário', value: `${user} (${user.id})`, inline: true },
        { name: '📊 Total de membros', value: guild.memberCount.toString(), inline: true }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    await this.sendLogMessage(guild.id, embed);
  }

  /**
   * Log de entrada em canal de voz
   */
  async logVoiceJoin(guild: Guild, user: User, channel: VoiceChannel): Promise<void> {
    if (!this.isEventEnabled(guild.id, 'voiceJoin')) return;

    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setTitle('🎵 Entrou no Canal de Voz')
      .setDescription(`**${user.tag}** entrou no canal de voz`)
      .addFields(
        { name: '👤 Usuário', value: `${user}`, inline: true },
        { name: '🔊 Canal', value: `${channel}`, inline: true },
        { name: '👥 Usuários no canal', value: channel.members.size.toString(), inline: true }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    await this.sendLogMessage(guild.id, embed);
  }

  /**
   * Log de saída de canal de voz
   */
  async logVoiceLeave(guild: Guild, user: User, channel: VoiceChannel): Promise<void> {
    if (!this.isEventEnabled(guild.id, 'voiceLeave')) return;

    const embed = new EmbedBuilder()
      .setColor(Colors.Orange)
      .setTitle('🎵 Saiu do Canal de Voz')
      .setDescription(`**${user.tag}** saiu do canal de voz`)
      .addFields(
        { name: '👤 Usuário', value: `${user}`, inline: true },
        { name: '🔊 Canal', value: `${channel}`, inline: true },
        { name: '👥 Usuários no canal', value: channel.members.size.toString(), inline: true }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    await this.sendLogMessage(guild.id, embed);
  }

  /**
   * Log de mudança de canal de voz
   */
  async logVoiceMove(guild: Guild, user: User, oldChannel: VoiceChannel, newChannel: VoiceChannel): Promise<void> {
    if (!this.isEventEnabled(guild.id, 'voiceMove')) return;

    const embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setTitle('🎵 Mudou de Canal de Voz')
      .setDescription(`**${user.tag}** mudou de canal de voz`)
      .addFields(
        { name: '👤 Usuário', value: `${user}`, inline: true },
        { name: '🔊 De', value: `${oldChannel}`, inline: true },
        { name: '🔊 Para', value: `${newChannel}`, inline: true }
      )
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

    await this.sendLogMessage(guild.id, embed);
  }

  /**
   * Log de mensagem deletada
   */
  async logMessageDelete(guild: Guild, message: Message): Promise<void> {
    if (!this.isEventEnabled(guild.id, 'messageDelete')) return;
    if (message.author.bot) return;

    const embed = new EmbedBuilder()
      .setColor(Colors.Red)
      .setTitle('🗑️ Mensagem Deletada')
      .setDescription(`Mensagem de **${message.author.tag}** foi deletada`)
      .addFields(
        { name: '👤 Autor', value: `${message.author}`, inline: true },
        { name: '📝 Conteúdo', value: message.content || '*Sem conteúdo*', inline: false },
        { name: '📍 Canal', value: `${message.channel}`, inline: true }
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp();

    await this.sendLogMessage(guild.id, embed);
  }

  /**
   * Log de mensagem editada
   */
  async logMessageUpdate(guild: Guild, oldMessage: Message, newMessage: Message): Promise<void> {
    if (!this.isEventEnabled(guild.id, 'messageUpdate')) return;
    if (newMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const embed = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setTitle('✏️ Mensagem Editada')
      .setDescription(`Mensagem de **${newMessage.author.tag}** foi editada`)
      .addFields(
        { name: '👤 Autor', value: `${newMessage.author}`, inline: true },
        { name: '📍 Canal', value: `${newMessage.channel}`, inline: true },
        { name: '📝 Antes', value: oldMessage.content || '*Sem conteúdo*', inline: false },
        { name: '📝 Depois', value: newMessage.content || '*Sem conteúdo*', inline: false }
      )
      .setThumbnail(newMessage.author.displayAvatarURL())
      .setTimestamp();

    await this.sendLogMessage(guild.id, embed);
  }
}
