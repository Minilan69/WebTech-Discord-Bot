// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Permet de ban un membre")
    .addUserOption((option) =>
      option
        .setName("membre")
        .setDescription("Le membre à ban")
        .setRequired(true)
    ),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("membre");
    const member = await interaction.guild.members.fetch(user.id);

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
