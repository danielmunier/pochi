const { SlashCommandBuilder } = require("discord.js");
const {
  get_latest_post,
} = require("../../functions/instagram/get_latest_post");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("instagram")
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Adicionar ou remover usuário")
        .setRequired(true)
        .addChoices(
          {
            name: "adicionar",
            value: "add",
          },
          {
            name: "remover",
            value: "remove",
          },
          {
            name: "listar",
            value: "list",
          }
        )
    )

    .addStringOption((option) =>
      option
        .setName("profile_user")
        .setDescription("profile_user")
        .setRequired(true)
    )
    .setDescription("Acompanhar um perfil do Twitter"),
  async execute(interaction) {
    if (!interaction.member.permissions.has("MANAGER_MESSAGES")) {
      await interaction.reply({
        content: "Você não possui permissão para isso",
        ephemeral: true,
      });
      return;
    }
    let action = await interaction.options.getString("action");

    switch (action) {
      case "add":
        const profile_user = interaction.options.getString("profile_user");
        const channel = interaction.channel;
        const guild = interaction.guild;
        const data = fs.readFileSync("data.json");
        const data_json = JSON.parse(data);

        if (!data_json[guild.id]) {
          data_json[guild.id] = {
            [profile_user]: {
              channel_id: channel.id,
              latest_post: "",
            },
          };
          fs.writeFileSync("data.json", JSON.stringify(data_json));

        } else {
          for (data_json_user in data_json[guild.id]) {
            if (data_json_user === profile_user) {
              data_json[guild.id][profile_user].channel_id = channel.id;
            } else {
              data_json[guild.id][profile_user] = {
                channel_id: channel.id,
                latest_post: "",
              };
              fs.writeFileSync("data.json", JSON.stringify(data_json));
            }
          }
        }
        interaction.reply({content: "Usuário adicionado com sucesso", ephemeral: true})
        break;

        case "remove":
          const profile_user_remove = interaction.options.getString("profile_user");
          const guild_remove = interaction.guild;
          const data_remove = fs.readFileSync("data.json");
          const data_json_remove = JSON.parse(data_remove);
                
          if (data_json_remove[guild_remove.id] && data_json_remove[guild_remove.id][profile_user_remove]) {
            delete data_json_remove[guild_remove.id][profile_user_remove];
            
            if (Object.keys(data_json_remove[guild_remove.id]).length === 0) {
              delete data_json_remove[guild_remove.id];
            }
            
            fs.writeFileSync("data.json", JSON.stringify(data_json_remove));
            interaction.reply({content: "Usuário removido com sucesso", ephemeral: true});
          } else {
            interaction.reply({content: "Usuário não encontrado", ephemeral: true});
          }
          break;
        
      }
  },
};
