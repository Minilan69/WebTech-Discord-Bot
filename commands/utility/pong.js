const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pong")
    .setDescription("Répond ping !"),
  async execute(interaction) {
    await interaction.reply("Ping!");
  },
};
