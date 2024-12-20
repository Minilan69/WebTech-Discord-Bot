// Imports
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

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
    const caller = interaction.member;
    const user = interaction.options.getUser("member");
    const member = await interaction.guild.members.fetch(user.id);

    // Verify if the caller has the permission to ban members
    if (!caller.roles.cache.has("1315425516853133404")) {
      return interaction.reply({
        content: "❌ Tu n'as pas la permission de ban des membres",
        ephemeral: true,
      });
    }

    // Verify is not an admin
    if (member.roles.cache.has("1315425516853133404")) {
      return interaction.reply({
        content: "❌ Vous ne pouvez pas ban un administrateur",
        ephemeral: true,
      });
    }

    // Verify if the user is not the caller
    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: "❌ Tu ne peux pas te bannir toi-même",
        ephemeral: true,
      });
    }

    // Ban User
    try {
      interaction.guild.members.ban(user);
      await interaction.editReply(`✅ <@${user.id}> a été ban`);
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply("❌ Impossible de ban le membre");
    }
  },
};
