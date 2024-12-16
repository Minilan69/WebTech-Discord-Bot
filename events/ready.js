// Imports
const { Events } = require("discord.js");

// Event Responde
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(
      `[✅PASS] ${
        client.user.username
      } launched at ${new Date().toLocaleTimeString()} the ${new Date().toLocaleDateString()}`
    );
  },
};
