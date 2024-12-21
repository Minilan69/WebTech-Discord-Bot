// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Permet de unmute un membre")
    .addUserOption((option) =>
      option
        .setName("membre")
        .setDescription("Le membre à unmute")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("La raison du unmute")
        .setRequired(true)
    ),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("membre");
    const member = await interaction.guild.members.fetch(user.id);
    const time = member.communicationDisabledUntilTimestamp;
    const reason = interaction.options.getString("raison");

    // Verify is not an admin
    if (member.roles.cache.has("1315425516853133404")) {
      return interaction.reply({
        content: "❌ Vous ne pouvez pas unmute un admin",
        ephemeral: true,
      });
    }

    // Verify if the user is not the caller
    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: "❌ Tu ne peux pas te unmute toi-même",
        ephemeral: true,
      });
    }

    // Verify if the user is muted
    if (!time) {
      return interaction.reply({
        content: "❌ Ce membre n'est pas mute",
        ephemeral: true,
      });
    }

    // Kick User
    try {
      member.timeout(null, reason);
      await interaction.editReply(
        `✅ <@${user.id}> a été unmute avec ${time} minutes restantes`
      );
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply("❌ Impossible de unmute le membre");
    }
  },
};
