// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("nettoyer")
    .setDescription("Supprimer un nombre spécifié de messages")
    .addIntegerOption((option) =>
      option
        .setName("nombre")
        .setDescription("Le nombre de messages à supprimer")
        .setRequired(true)
    ),

  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const amount = interaction.options.getInteger("nombre");
    if (amount < 1 || amount > 100) {
      return interaction.editReply(
        "❌ Vous devez spécifier un nombre entre 1 et 100"
      );
    }
    await interaction.channel.bulkDelete(amount, true);
    await interaction.editReply({
      content: `✅ ${amount} messages ont été supprimés`,
      ephemeral: true,
    });
  },
};
