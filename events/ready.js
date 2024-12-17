// Imports
const { Events } = require("discord.js");

// Event Responder
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const launchTime = new Date();

    // Affichage dans la console
    console.log(
      `[✅PASS] ${
        client.user.username
      } launched at ${launchTime.toLocaleTimeString()} the ${launchTime.toLocaleDateString()}`
    );

    // Récupération du salon via son ID
    const channelId = "1317123140052324362"; // Remplace par l'ID du salon
    const roleId = "1315425516853133404"; // Remplace par l'ID du rôle à mentionner
    const channel = client.channels.cache.get(channelId);

    if (channel) {
      try {
        // Envoi d'un message dans le salon avec mention du rôle
        channel.send({
          content: `🚀 **${
            client.user.username
          }** a bien été lancé à ${launchTime.toLocaleTimeString()} le ${launchTime.toLocaleDateString()} ! <@&${roleId}>`,
        });
      } catch (error) {
        console.error(
          "[❌ERROR] Can't Send Message",
          error
        );
      }
    } else {
      console.error(`❌ Channel "${channelId}" missing`);
    }
  },
};
