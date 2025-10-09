import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('🏓 Bong! Mostra a latência do bot');

export async function execute(interaction: ChatInputCommandInteraction) {
  const startTime = Date.now();
  
  await interaction.reply({ 
    content: '🏓 Bong! Calculando latência...'
  });

  const latency = Date.now() - startTime;
  const apiLatency = Math.round(interaction.client.ws.ping);

  const embed = new EmbedBuilder()
    .setTitle('🏓 Bong!')
    .setColor('#00ff00')
    .addFields(
      { 
        name: '📡 Latência da API', 
        value: `${apiLatency}ms`, 
        inline: true 
      },
      { 
        name: '⏱️ Latência do Bot', 
        value: `${latency}ms`, 
        inline: true 
      },
      { 
        name: '💓 Status', 
        value: apiLatency < 100 ? '🟢 Excelente' : 
               apiLatency < 200 ? '🟡 Bom' : '🔴 Lento', 
        inline: true 
      }
    )
    .setTimestamp()
    .setFooter({ 
      text: `Solicitado por ${interaction.user.username}`, 
      iconURL: interaction.user.displayAvatarURL() 
    });

  await interaction.editReply({ 
    content: '', 
    embeds: [embed] 
  });
}
