// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("alumni")
    .setDescription("Permet d'ajouter un alumni webtech")
    .addUserOption((option) =>
      option
        .setName("student")
        .setDescription("L'élève à ajouter")
        .setRequired(true)
    ),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("student");

    const member = await interaction.guild.members.fetch(user.id);

    // Remove User
    try {
      // Modifications
      await member.roles.add("1317826544055615498");
      await member.roles.remove("1315319863685939220");

      await member.setNickname("");
      await interaction.editReply(`✅ <@${user.id}> a été ajouter`);
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply(
        "❌ Impossible de changer le pseudo ou d'ajouter/retirer le rôle"
      );
    }
  },
};
