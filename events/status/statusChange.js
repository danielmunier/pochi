const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: false,
  execute(client) {
    client.user.setPresence({
      activity: {
        name: "Soy hot",
        type: "PLAYING", // Pode ser 'PLAYING', 'WATCHING', 'LISTENING' ou 'STREAMING'
      },
      status: "online", // Pode ser 'online', 'idle', 'dnd' (do not disturb) ou 'invisible'
    });

    // Alternar entre diferentes estados a cada 10 segundos
    setInterval(() => {
      const statuses = [
        { name: "Status 1", type: "PLAYING" },
        { name: "Status 2", type: "WATCHING" },
        { name: "Status 3", type: "LISTENING" },
      ];

      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      const status = ["online", "idle", "dnd"];
      const activities = [
        "Lotus Club",
        "Project Zomboid",
        "Terraria",
        "Valorant",
        "Minecraft",
        "Honkai: Star Rail",
        "Made by Bileygg",
      ];
      client.user.setActivity(
        activities[Math.floor(Math.random() * status.length)],
        { type: ActivityType.Playing }
      );

      /*   client.user.setPresence({
              activity: {
                name: randomStatus.name,
                type: randomStatus.type,
              },    
              status: status[Math.floor(Math.random() * status.length)],
            });
 */
    }, 100000); // Tempo em milissegundos para alternar o status (neste exemplo, a cada 10 segundos)
  },
};
