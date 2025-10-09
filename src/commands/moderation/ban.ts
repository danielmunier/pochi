import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { ModerationService } from '../../services/moderationService';

const moderationService = new ModerationService();

export const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Bane um usuário do servidor')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('Usuário para banir')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('reason')
      .setDescription('Motivo do banimento')
      .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const user = interaction.options.getUser('user', true);
  const reason = interaction.options.getString('reason') || 'Sem motivo especificado';

  // Verifica se o usuário pode ser banido
  if (user.id === interaction.user.id) {
    return await interaction.reply({
      content: '❌ Você não pode banir a si mesmo!',
      ephemeral: true
    });
  }

  if (user.id === interaction.client.user?.id) {
    return await interaction.reply({
      content: '❌ Você não pode banir o bot!',
      ephemeral: true
    });
  }

  // Verifica se o usuário tem permissão para banir
  const member = interaction.guild?.members.cache.get(user.id);
  if (member && member.roles.highest.position >= (interaction.member as any)?.roles.highest.position) {
    return await interaction.reply({
      content: '❌ Você não pode banir este usuário!',
      ephemeral: true
    });
  }

  await interaction.deferReply();

  try {
    // Chama serviço Python
    const result = await moderationService.banUser({
      user_id: user.id,
      guild_id: interaction.guildId!,
      moderator_id: interaction.user.id,
      reason
    });

    if (result.success) {
      await interaction.editReply({
        content: `✅ **${user.username}** foi banido do servidor!\n📝 **Motivo:** ${reason}`
      });
    } else {
      await interaction.editReply({
        content: `❌ Erro ao banir usuário: ${result.error}`
      });
    }
  } catch (error) {
    console.error('Erro ao banir usuário:', error);
    await interaction.editReply({
      content: '❌ Erro interno ao banir usuário!'
    });
  }
}
