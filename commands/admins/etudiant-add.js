// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
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

  // Collect Argumuments
  async execute(interaction) {
    const user = interaction.options.getUser("étudiant");
    const annee = interaction.options.getNumber("année");

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
      await interaction.reply(`✅ <@${user.id}> a été ajouté`);
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.reply(
        "❌ Impossible de changer le pseudo ou d'ajouter le rôle"
      );
    }
  },
};
