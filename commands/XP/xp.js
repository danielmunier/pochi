const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionsBitField } = require("discord.js");
const {
    user_db
} = require("../../utils/user");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xp")
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Info about a user')
                .addMentionableOption(option => option.setName('user').setDescription(('Username')))
                .addNumberOption(option => option.setName('amount').setDescription(('Amount')))
             
                
        ).addSubcommand(subcommand =>
            subcommand
                .setName("remove")
                .setDescription("Remove info about a user")
                .addMentionableOption(option => option.setName('user').setDescription(('Username')))
                .addNumberOption(option => option.setName('amount').setDescription(('Amount')))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("info")
                .setDescription("Listar informações de si mesmo")
        )



        .setDescription("Lida com a experiência do usuário"),
    async execute(interaction) {
      
        let action = await interaction.options.getSubcommand()



      

        if (action === "add") {
          if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            await interaction.reply({
                content: "Você não possui permissão para isso",
                ephemeral: true,
            });
            return;
        }
            let amount = await interaction.options.getNumber('amount')
            if (amount <= 0) {
                await interaction.reply({ content: "Insira um valor maior que 0", ephemeral: true })
                return
            }

            let member = await interaction.options.getMember('user')



            await user_db.update({ guild_id: interaction.guild.id, user_id: member.user.id, xp: amount })


            await interaction.reply({ content: `${amount} xp adicionados para **${member.user.username}**!` })
        }

        else if (action === "remove") {
          console.log(interaction.member.permissions)
          if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            await interaction.reply({
                content: "Você não possui permissão para isso",
                ephemeral: true,
            });
            return;
        }

            let amount = await interaction.options.getNumber('amount')
            if (amount <= 0) {
                await interaction.reply({ content: "Insira um valor maior que 0", ephemeral: true })
                return
            }

            let member = await interaction.options.getMember('user')

            await user_db.update({ guild_id: interaction.guild.id, user_ID: member.user.id, xp: -amount })

            await interaction.reply({ content: `${amount} xp removidos de **${member.user.username}**!` })
        }

        else if(action === "info") {
         
            let dataUser = await user_db.read(interaction.guild.id, interaction.user.id)
            const xpRoles = [
                { level: "Membro", xpRequired: 0, id: '970167616717086760'},
                { level: "Veterano", xpRequired: 1000, id: '1147971164052930640' },
                { level: "Mestre", xpRequired: 5000, id: '1148039871127097384' },
                { level: "Elite", xpRequired: 10000, id: '1147971306571190302' },
                { level: "Lendario", xpRequired: 20000, id: '1050492025541247087' },
                { level: "Divino", xpRequired: 50000, id: '1042721419047481406' },
              ];

              let currentRole = 0;
              let nextRole = 0;

              for (const xpRole of xpRoles) {
                if (dataUser.xp >= xpRole.xpRequired) {
                    currentRole = xpRole;
                }
              }
            const currentRoleIndex = xpRoles.indexOf(currentRole)

            if(currentRoleIndex === xpRoles.length - 1 ) {
                nextRole = { level: "VIP", xpRequired: 0, id: '1042721419047481406' }
            } else {
                nextRole = xpRoles[currentRoleIndex + 1]
            }
            const embed = new EmbedBuilder()
            .setAuthor({
              name: `${interaction.user.username}`,
              url: "https://example.com",
            })
            .addFields(
              {
                name: "Cargo",
                value: `${currentRole.level}`,
                inline: true
              },
              {
                name: "XP atual",
                value: `${dataUser.xp} xp`,
                inline: true
              },
              {
                name: "Rank atual",
                value: "0",
                inline: true
              },
              {
                name: "Mensagens",
                value: `${dataUser.total_messages} mensagens`,
                inline: true
              },
              {
                name: "Próximo nivel",
                value: `${nextRole.xpRequired - dataUser.xp} xp`,
                inline: true
              },
              {
                name: "Próximo cargo",
                value: nextRole.level,
                inline: true
              },
            )
            .setThumbnail(`https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png`)
            .setColor("#00b0f4")
            .setFooter({
              text: "Lotus Club",
            })
            .setTimestamp();
            console.log(interaction.user.avatarURL())

            interaction.reply({embeds: [embed]})
        }

    },
};
