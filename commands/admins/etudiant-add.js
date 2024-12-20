// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("etudiant-ajouter")
    .setDescription("Permet d'ajouter un étudiant webtech")
    .addUserOption((option) =>
      option
        .setName("étudiant")
        .setDescription("L'élève à ajouter")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("année")
        .setDescription("Son année")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5)
    ),

  // Execution
  async execute(interaction) {
    await interaction.deferReply();

    // Variables
    const user = interaction.options.getUser("étudiant");
    const annee = interaction.options.getNumber("année");

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
      await member.roles.add("1315319863685939220");

      await member.setNickname(`${name} • N${annee}`);
      await interaction.editReply(`✅ <@${user.id}> a été ajouté`);
    } catch (error) {
      // Error
      console.error("[❌ERROR]", error);
      await interaction.editReply(
        "❌ Impossible de changer le pseudo ou d'ajouter le rôle"
      );
    }
  },
};
