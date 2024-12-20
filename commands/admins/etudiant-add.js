// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("etudiant-ajouter")
    .setDescription("Permet d'ajouter un étudiant webtech")
    .addUserOption((option) =>
      option
        .setName("student")
        .setDescription("L'élève à ajouter")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("year")
        .setDescription("Son année")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5)
    ),

  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("student");
    const annee = interaction.options.getNumber("year");

    const member = await interaction.guild.members.fetch(user.id);

    // Add User
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
      await member.roles.add("1315319863685939220");

      await member.setNickname(`${name} • N${annee}`);
      await interaction.editReply(`✅ <@${user.id}> a été ajouté`);
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply(
        "❌ Impossible de changer le pseudo ou d'ajouter le rôle"
      );
    }
  },
};
