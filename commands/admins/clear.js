// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Supprimer un nombre spécifié de messages")
    .addIntegerOption((option) =>
      option
        .setName("nombre")
        .setDescription("Le nombre de messages à supprimer")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),

  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const amount = interaction.options.getInteger("nombre");
    await interaction.channel.bulkDelete(amount, true);
    await interaction.editReply({
      content: `✅ ${amount} messages ont été supprimés`,
      ephemeral: true,
    });
  },
};
