import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType } from 'discord.js';
import { LoggingService } from '../../services/loggingService';

export const data = new SlashCommandBuilder()
  .setName('setlogchannel')
  .setDescription('Configura o canal de logs do servidor')
  .addChannelOption(option =>
    option
      .setName('canal')
      .setDescription('Canal onde os logs serão enviados')
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction: ChatInputCommandInteraction) {
  const channel = interaction.options.getChannel('canal', true);
  
  if (!interaction.guild) {
    return interaction.reply({ content: '❌ Este comando só pode ser usado em servidores!', ephemeral: true });
  }

  // Obtém o serviço de logging do client
  const loggingService = (interaction.client as any).loggingService as LoggingService;
  
  if (!loggingService) {
    return interaction.reply({ content: '❌ Serviço de logging não disponível!', ephemeral: true });
  }

  try {
    // Verifica permissões do bot no canal
    const botMember = interaction.guild.members.me;
    if (!botMember) {
      return interaction.reply({ 
        content: '❌ Bot não é membro deste servidor!',
        ephemeral: true 
      });
    }

    const permissions = (channel as any).permissionsFor?.(botMember);
    if (!permissions) {
      return interaction.reply({ 
        content: '❌ Não foi possível verificar permissões do bot neste canal.',
        ephemeral: true 
      });
    }

    if (!permissions.has('SendMessages')) {
      return interaction.reply({ 
        content: `❌ Bot não tem permissão para **enviar mensagens** no canal ${channel}.\n\n**Permissões necessárias:**\n• Enviar Mensagens\n• Incorporar Links\n\n**Permissões atuais:**\n${permissions.toArray().join(', ')}`,
        ephemeral: true 
      });
    }

    if (!permissions.has('EmbedLinks')) {
      return interaction.reply({ 
        content: `❌ Bot não tem permissão para **incorporar links** no canal ${channel}.\n\n**Permissões necessárias:**\n• Enviar Mensagens\n• Incorporar Links\n\n**Permissões atuais:**\n${permissions.toArray().join(', ')}`,
        ephemeral: true 
      });
    }

    const success = await loggingService.setLogChannel(interaction.guild.id, channel.id);
    
    if (success) {
      await interaction.reply({ 
        content: `✅ Canal de logs configurado para ${channel}!\n\n**Eventos que serão registrados:**\n• 👋 Entrada/Saída de membros\n• 🎵 Eventos de voz\n• ✏️ Mensagens editadas/deletadas\n• 🔄 Mudanças de estado\n\n**Permissões verificadas:**\n• ✅ Enviar Mensagens\n• ✅ Incorporar Links`,
        ephemeral: true 
      });
    } else {
      await interaction.reply({ 
        content: '❌ Erro interno ao configurar canal de logs. Tente novamente.',
        ephemeral: true 
      });
    }
  } catch (error: any) {
    console.error('Erro ao configurar canal de logs:', error);
    
    let errorMessage = '❌ Erro interno ao configurar canal de logs.';
    
    if (error.code === 50013) {
      errorMessage = `❌ **Erro de Permissão**\n\nBot não tem permissão para enviar mensagens no canal ${channel}.\n\n**Solução:**\n1. Verifique as permissões do bot no canal\n2. Certifique-se de que o bot tem as permissões necessárias`;
    } else if (error.code === 50001) {
      errorMessage = `❌ **Erro de Acesso**\n\nBot não tem permissão para acessar o canal ${channel}.\n\n**Solução:**\n1. Verifique se o bot pode ver o canal\n2. Certifique-se de que o canal não é privado para o bot`;
    } else if (error.code === 10003) {
      errorMessage = `❌ **Canal Não Encontrado**\n\nO canal ${channel} não foi encontrado.\n\n**Solução:**\n1. Verifique se o canal ainda existe\n2. Tente selecionar outro canal`;
    }
    
    await interaction.reply({ 
      content: errorMessage,
      ephemeral: true 
    });
  }
}
