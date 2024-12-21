// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Permet de mute un membre")
    .addUserOption((option) =>
      option
        .setName("membre")
        .setDescription("Le membre à mute")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("durée")
        .setDescription("La durée en minutes du mute")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(40320)
    )
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("La raison du mute")
        .setRequired(true)
    ),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("membre");
    const member = await interaction.guild.members.fetch(user.id);
    const time = interaction.options.getNumber("durée");
    const reason = interaction.options.getString("raison");

    // Verify is not an admin
    if (member.roles.cache.has("1315425516853133404")) {
      return interaction.editReply({
        content: "❌ Vous ne pouvez pas mute un admin",
        ephemeral: true,
      });
    }

    // Verify if the user is not the bot
    if (member.user.id === interaction.client.user.id) {
      return interaction.reply("❌Vous ne pouvez pas mute le bot");
    }

    // Verify if the user is not the caller
    if (user.id === interaction.user.id) {
      return interaction.editReply({
        content: "❌ Tu ne peux pas te mute toi-même",
        ephemeral: true,
      });
    }

    // Kick User
    try {
      member.timeout(time * 60000, reason);
      await interaction.editReply(
        `✅ <@${user.id}> a été mute pour ${time} minutes\n
        Raison: ${reason}`
      );
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply("❌ Impossible de mute le membre");
    }
  },
};
