const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(
      `Launch ${
        client.user.username
      } at ${new Date().toLocaleTimeString()} the ${new Date().toLocaleDateString()}`
    );
  },
};
