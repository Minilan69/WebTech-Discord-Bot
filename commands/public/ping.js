// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Répond pong !"),
  async execute(interaction) {
    await interaction.reply("🏓Pong!");
  },
};
