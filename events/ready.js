// Imports
const { Events } = require("discord.js");

// Event Responder
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    const launchTime = new Date();

    // Console
    console.log(
      `[✅PASS] ${
        client.user.username
      } launched at ${launchTime.toLocaleTimeString()} the ${launchTime.toLocaleDateString()}`
    );

    // Message
    const channelId = "1317123140052324362";
    const roleId = "1315425516853133404";
    const channel = client.channels.cache.get(channelId);

    if (channel) {
      try {
        channel.send({
          content: `✅ **${
            client.user.username
          }** a bien été lancé à ${launchTime.toLocaleTimeString()} le ${launchTime.toLocaleDateString()} ! <@&${roleId}>`,
        });
      } catch (error) {
        console.error("[❌ERROR] Can't Send Message", error);
      }
    } else {
      console.error(`[❌ERROR] Channel "${channelId}" missing`);
    }
  },
};
