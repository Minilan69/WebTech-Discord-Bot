// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("etudiant-retirer")
    .setDescription("Permet de retirer un étudiant webtech")
    .addUserOption((option) =>
      option
        .setName("étudiant")
        .setDescription("L'élève à retirer")
        .setRequired(true)
    ),

  // Execute
  async execute(interaction) {
    await interaction.deferReply();
    
    // Variables
    const user = interaction.options.getUser("étudiant");

    const member = await interaction.guild.members.fetch(user.id);
    let name =
      member.nickname ||
      user.globalName ||
      user.username ||
      "Pseudo Non Récupérable";

    try {
      // Verified If Already Have • N* In Nickname
      const anneePattern = / • N\d+$/;
      if (anneePattern.test(name)) {
        name = name.replace(anneePattern, "");
      }

      // Modifications
      await member.roles.remove("1315319863685939220");

      await member.setNickname(`${name}`);
      await interaction.editReply(`✅ <@${user.id}> a été retiré`);
    } catch (error) {
      // Error
      console.error("[❌ERROR]", error);
      await interaction.editReply(
        "❌ Impossible de changer le pseudo ou de retirer le rôle"
      );
    }
  },
};