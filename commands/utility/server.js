const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Donne des informations sur le serveur"),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `Le serveur est ${interaction.guild.name} et compte ${interaction.guild.memberCount} membres`
    );
  },
};
