import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { ModerationService } from '../../services/moderationService';

const moderationService = new ModerationService();

export const data = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Expulsa um usuário do servidor')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('Usuário para expulsar')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('reason')
      .setDescription('Motivo da expulsão')
      .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

export async function execute(interaction: ChatInputCommandInteraction) {
  const user = interaction.options.getUser('user', true);
  const reason = interaction.options.getString('reason') || 'Sem motivo especificado';

  // Verifica se o usuário pode ser expulso
  if (user.id === interaction.user.id) {
    return await interaction.reply({
      content: '❌ Você não pode expulsar a si mesmo!',
      ephemeral: true
    });
  }

  if (user.id === interaction.client.user?.id) {
    return await interaction.reply({
      content: '❌ Você não pode expulsar o bot!',
      ephemeral: true
    });
  }

  // Verifica se o usuário tem permissão para expulsar
  const member = interaction.guild?.members.cache.get(user.id);
  if (member && member.roles.highest.position >= (interaction.member as any)?.roles.highest.position) {
    return await interaction.reply({
      content: '❌ Você não pode expulsar este usuário!',
      ephemeral: true
    });
  }

  await interaction.deferReply();

  try {
    // Chama serviço Python
    const result = await moderationService.kickUser({
      user_id: user.id,
      guild_id: interaction.guildId!,
      moderator_id: interaction.user.id,
      reason
    });

    if (result.success) {
      await interaction.editReply({
        content: `✅ **${user.username}** foi expulso do servidor!\n📝 **Motivo:** ${reason}`
      });
    } else {
      await interaction.editReply({
        content: `❌ Erro ao expulsar usuário: ${result.error}`
      });
    }
  } catch (error) {
    console.error('Erro ao expulsar usuário:', error);
    await interaction.editReply({
      content: '❌ Erro interno ao expulsar usuário!'
    });
  }
}
