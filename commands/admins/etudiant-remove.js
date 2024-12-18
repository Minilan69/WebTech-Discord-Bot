// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("etudiant-retirer")
    .setDescription("Permet de retirer un étudiant webtech")
    .addUserOption((option) =>
      option
        .setName("student")
        .setDescription("L'élève à retirer")
        .setRequired(true)
    ),

  // Execute
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("student");

    const member = await interaction.guild.members.fetch(user.id);

    // Remove User
    try {
      let name =
        member.nickname ||
        user.globalName ||
        user.username ||
        "Pseudo Non Récupérable";

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
      console.error("[❌ERROR]", error);
      await interaction.editReply(
        "❌ Impossible de changer le pseudo ou de retirer le rôle"
      );
    }
  },
};