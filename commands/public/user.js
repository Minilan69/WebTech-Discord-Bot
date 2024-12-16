// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Donne des informations sur l'utilisateur"),
  async execute(interaction) {
    await interaction.reply(
      `${interaction.user.globalName} tu as rejoint le ${interaction.member.joinedAt}`
    );
  },
};
