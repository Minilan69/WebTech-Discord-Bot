const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Connected as ${client.user.username} at ${Date()}`);
  },
};
