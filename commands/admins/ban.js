// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Permet de ban un membre")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Le membre à ban")
        .setRequired(true)
    ),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("member");

    // Ban User
    try {
      guild.members.ban(user);
      await interaction.editReply(`✅ <@${user.id}> a été ban`);
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply("❌ Impossible de ban le membre");
    }
  },
};
