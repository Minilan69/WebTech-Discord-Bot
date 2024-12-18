// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Donne des informations sur le serveur"),
  async execute(interaction) {
    await interaction.reply(
      `Le serveur **${interaction.guild.name}** comporte actuellement **${interaction.guild.memberCount} membres**`
    );
  },
};
