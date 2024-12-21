// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("alumni")
    .setDescription("Permet d'ajouter un alumni webtech")
    .addUserOption((option) =>
      option
        .setName("étudiant")
        .setDescription("L'élève à ajouter")
        .setRequired(true)
    ),

  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    
    // Variables
    const user = interaction.options.getUser("étudiant");

    const member = await interaction.guild.members.fetch(user.id);

    try {
      // Role change
      await member.roles.add("1317826544055615498");
      await member.roles.remove("1315319863685939220");

      // Reset the nickname
      await member.setNickname("");
      
      await interaction.editReply(`✅ <@${user.id}> a été ajouter`);
    } catch (error) {
      // Error
      console.error("[❌ERROR]", error);
      await interaction.editReply(
        "❌ Impossible de changer le pseudo ou d'ajouter/retirer le rôle"
      );
    }
  },
};
