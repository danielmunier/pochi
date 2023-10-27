const { Events, EmbedBuilder, Embed } = require("discord.js")

const fs = require('fs')

const { get_ranking, get_ranking_message} = require("../../functions/rank/get_guild_ranking")


function get_post_channel() {
    const message = JSON.parse(fs.readFileSync("./message.json", 'utf8'))
    return message
}

function update_message_id({ id }) {
    const message = get_post_channel()

    message.message_id = id

    fs.writeFileSync("./message.json", JSON.stringify(message))


}

module.exports = {
    name: Events.ClientReady,
    once: false,
    async execute(client) {
        
        const rankData = get_post_channel()
        const guild = client.guilds.cache.get("959115766630854797")
        const channel = guild.channels.cache.get(rankData.channel_id)
        const ranking = await get_ranking_message({ guild_id: "959115766630854797", path: "ranking.json" })
        let description = ""
        for (let i = 0; i < ranking.length; i++) {
            description += `${i + 1} - <@${ranking[i].userId}>: ${ranking[i].messages} mensagens \n`
        }

        console.log(ranking)
        const embed = new EmbedBuilder()
            .setTitle("Top 10 Ranking de mensagens")
            .setDescription(description)
            .setTimestamp()

      

         if (!rankData.message_id || rankData.message_id.length === 0) {
            console.log("Mensagem nunca foi enviada anteriormente")
            channel.send({ embeds: [embed] }).then((message) => {
                update_message_id({ id: message.id })
            }

            )

        } else {
            const message = await channel.messages.fetch(rankData.message_id)
            console.log("Mensagem encontrada e sendo editada")
            message.edit({ embeds: [embed] })

        } 


    }
}