// Imports
const { Events } = require("discord.js");

// Event Responder
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    // Variables
    const launchTime = new Date();
    const channelId = "1317123140052324362";
    const roleId = "1315425516853133404";
    const channel = client.channels.cache.get(channelId);

    // Console
    console.log(
      `[✅PASS] ${
        client.user.username
      } launched at ${launchTime.toLocaleTimeString()} the ${launchTime.toLocaleDateString()}`
    );

    // Message
    if (channel) {
      try {
        channel.send({
          content: `✅ **${
            client.user.username
          }** a bien été lancé à ${launchTime.toLocaleTimeString()} le ${launchTime.toLocaleDateString()} ! <@&${roleId}>`,
        });
      } catch (error) {
        // Error
        console.error("[❌ERROR] Can't Send Message", error);
      }
    } else {
      // Error
      console.error(`[❌ERROR] Channel "${channelId}" missing`);
    }
  },
};
