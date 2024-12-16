// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Donne des informations sur le serveur"),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `Le serveur **${interaction.guild.name}** comporte actuellement **${interaction.guild.memberCount} membres**`
    );
  },
};
