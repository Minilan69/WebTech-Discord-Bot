const { Events, PermissionsBitField } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    await message.channel.send("Yep");
  },
};
