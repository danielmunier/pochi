import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { MusicService } from '../../services/musicService';

const musicService = new MusicService();

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Toca uma música')
  .addStringOption(option =>
    option
      .setName('song')
      .setDescription('Nome ou URL da música')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const song = interaction.options.getString('song', true);
  
  // Verifica se o usuário está em um canal de voz
  const voiceChannel = (interaction.member as any)?.voice?.channel;
  if (!voiceChannel) {
    return await interaction.reply({
      content: '❌ Você precisa estar em um canal de voz!',
      ephemeral: true
    });
  }

  await interaction.deferReply();

  try {
    // Chama serviço Python
    const result = await musicService.playSong({
      guild_id: interaction.guildId!,
      channel_id: voiceChannel.id,
      song: song,
      user_id: interaction.user.id
    });

    if (result.success) {
      await interaction.editReply({
        content: `🎵 **Tocando:** ${song}\n📺 **Canal:** ${voiceChannel.name}`
      });
    } else {
      await interaction.editReply({
        content: `❌ Erro ao tocar música: ${result.error}`
      });
    }
  } catch (error) {
    console.error('Erro ao tocar música:', error);
    await interaction.editReply({
      content: '❌ Erro interno ao tocar música!'
    });
  }
}
