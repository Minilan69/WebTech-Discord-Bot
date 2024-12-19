// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Permet de kick un membre")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Le membre à kick")
        .setRequired(true)
    ),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("member");

    // Verify if the caller has the permission to kick members
    if (!interaction.guild.members.me.permissions.has("KICK_MEMBERS")) {
      return interaction.reply({
        content: "❌ Tu n'as pas la permission de Kick des membres",
        ephemeral: true,
      });
    }

    // Verify is not an admin
    const memberToKick = await interaction.guild.members.fetch(user.id);
    if (memberToKick.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "❌ Vous ne pouvez pas kick un administrateur",
        ephemeral: true,
      });
    }

    // Verify if the user is not the caller
    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: "❌ Tu ne peux pas te kick toi-même",
        ephemeral: true,
      });
    }

    // Kick User
    try {
      guild.members.kick(user);
      await interaction.editReply(`✅ <@${user.id}> a été kick`);
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply("❌ Impossible de kick le membre");
    }
  },
};
