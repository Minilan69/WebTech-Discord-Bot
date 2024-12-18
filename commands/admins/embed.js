const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Crée un embed personnalisé")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Titre de l'embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description de l'embed")
        .setRequired(true)
    ),
  async execute(interaction) {
    const title = interaction.options.getString("titre");
    const description = interaction.options.getString("description");
    const color = "#8b0000";

    try {
      // Créer l'embed
      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);

      // Envoyer l'embed dans le salon
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.reply({
        content: "❌ Une erreur est survenue en générant l'embed",
        ephemeral: true,
      });
    }
  },
};
