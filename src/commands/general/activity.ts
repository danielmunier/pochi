import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command } from '../../types';

export const data = new SlashCommandBuilder()
  .setName('activity')
  .setDescription('Gerencia o sistema de atividade dinâmica do bot')
  .addSubcommand(subcommand =>
    subcommand
      .setName('update')
      .setDescription('Força atualização imediata da atividade')
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('stats')
      .setDescription('Mostra estatísticas atuais do bot')
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('performance')
      .setDescription('Mostra informações de performance do sistema')
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('rotation')
      .setDescription('Controla a rotação automática de atividades')
      .addBooleanOption(option =>
        option
          .setName('enable')
          .setDescription('Habilitar ou desabilitar rotação automática')
          .setRequired(true)
      )
      .addIntegerOption(option =>
        option
          .setName('interval')
          .setDescription('Intervalo em segundos (padrão: 60)')
          .setMinValue(30)
          .setMaxValue(600)
      )
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const activityService = (interaction.client as any).activityService;
  
  if (!activityService) {
    return interaction.reply({
      content: '❌ Serviço de atividade não está disponível.',
      ephemeral: true
    });
  }

  const subcommand = interaction.options.getSubcommand();

  try {
    switch (subcommand) {
      case 'update': {
        activityService.forceUpdate();
        
        const stats = activityService.getStats();
        const embed = new EmbedBuilder()
          .setTitle('🔄 Atividade Forçada')
          .setDescription('A atividade do bot foi atualizada imediatamente!')
          .addFields(
            { name: '📊 Servidores', value: `${stats.guilds}`, inline: true },
            { name: '👥 Membros', value: `${stats.members.toLocaleString('pt-BR')}`, inline: true },
            { name: '⚡ Status', value: 'Atualização forçada', inline: true }
          )
          .setColor('#00ff00')
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }

      case 'stats': {
        const stats = activityService.getStats();
        const embed = new EmbedBuilder()
          .setTitle('📊 Estatísticas do Bot')
          .setDescription('Informações atuais sobre o bot')
          .addFields(
            { name: '🏠 Servidores', value: `${stats.guilds}`, inline: true },
            { name: '👥 Total de Membros', value: `${stats.members.toLocaleString('pt-BR')}`, inline: true },
            { name: '⚡ Uptime', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
          )
          .setColor('#0099ff')
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }

      case 'performance': {
        const stats = activityService.getStats();
        const perf = activityService.getPerformanceInfo();
        
        const embed = new EmbedBuilder()
          .setTitle('⚡ Performance do Sistema')
          .setDescription('Informações sobre o sistema de atividade dinâmica')
          .addFields(
            { name: '📊 Estatísticas Atuais', value: `${stats.guilds} servidores, ${stats.members.toLocaleString('pt-BR')} membros`, inline: false },
            { name: '🕐 Última Atualização', value: perf.lastUpdate ? `<t:${Math.floor(perf.lastUpdate / 1000)}:R>` : 'Nunca', inline: true },
            { name: '⏳ Atualização Pendente', value: perf.pendingUpdate ? 'Sim' : 'Não', inline: true },
            { name: '⏱️ Throttle Restante', value: `${Math.ceil(perf.throttleRemaining / 1000)}s`, inline: true }
          )
          .setColor('#ff9900')
          .setTimestamp();

        return interaction.reply({ embeds: [embed] });
      }

      case 'rotation': {
        const enable = interaction.options.getBoolean('enable', true);
        const interval = interaction.options.getInteger('interval') || 60;

        if (enable) {
          activityService.startRotation(interval * 1000);
          
          const embed = new EmbedBuilder()
            .setTitle('🔄 Rotação Automática Ativada')
            .setDescription(`A rotação automática de atividades foi ativada com intervalo de ${interval} segundos.\n\n⚠️ **Atenção**: Para bots grandes, recomenda-se intervalos maiores (5-10 minutos) para evitar rate limits.`)
            .addFields(
              { name: '⏱️ Intervalo', value: `${interval}s`, inline: true },
              { name: '🎯 Próxima Atualização', value: `<t:${Math.floor((Date.now() + interval * 1000) / 1000)}:R>`, inline: true }
            )
            .setColor('#00ff00')
            .setTimestamp();

          return interaction.reply({ embeds: [embed] });
        } else {
          activityService.stopRotation();
          
          const embed = new EmbedBuilder()
            .setTitle('⏹️ Rotação Automática Desativada')
            .setDescription('A rotação automática de atividades foi desativada.\n\n✅ **Recomendado** para bots grandes para evitar requisições desnecessárias.')
            .setColor('#ff9900')
            .setTimestamp();

          return interaction.reply({ embeds: [embed] });
        }
      }

      default:
        return interaction.reply({
          content: '❌ Subcomando inválido.',
          ephemeral: true
        });
    }
  } catch (error) {
    console.error('Erro ao executar comando activity:', error);
    return interaction.reply({
      content: '❌ Ocorreu um erro ao executar o comando.',
      ephemeral: true
    });
  }
}
