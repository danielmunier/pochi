import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { EconomyService, UserBalance } from '../../services/economyService';

const economyService = new EconomyService();

export const data = new SlashCommandBuilder()
  .setName('balance')
  .setDescription('Verifica o saldo de um usuário')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('Usuário para verificar saldo (deixe vazio para ver o seu)')
      .setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const targetUser = interaction.options.getUser('user') || interaction.user;
  
  await interaction.deferReply();

  try {
    // Chama serviço Python
    const result = await economyService.getUserBalance(targetUser.id, interaction.guildId!);

    if (result.success && result.data) {
      const { balance, level, xp } = result.data as UserBalance;
      
      const embed = new EmbedBuilder()
        .setTitle(`💰 Saldo de ${targetUser.username}`)
        .setColor('#00ff00')
        .addFields(
          { name: '💵 Saldo', value: `${balance.toLocaleString()} moedas`, inline: true },
          { name: '⭐ Level', value: `${level}`, inline: true },
          { name: '📈 XP', value: `${xp.toLocaleString()}`, inline: true }
        )
        .setThumbnail(targetUser.displayAvatarURL())
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } else {
      await interaction.editReply({
        content: `❌ Erro ao buscar saldo: ${result.error || 'Usuário não encontrado'}`
      });
    }
  } catch (error) {
    console.error('Erro ao buscar saldo:', error);
    await interaction.editReply({
      content: '❌ Erro interno ao buscar saldo!'
    });
  }
}
