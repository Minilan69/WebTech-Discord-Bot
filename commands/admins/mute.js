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
    ),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("membre");
    const member = await interaction.guild.members.fetch(user.id);
    const time = interaction.options.getNumber("durée");

    // Verify is not an admin
    if (member.roles.cache.has("1315425516853133404")) {
      return interaction.reply({
        content: "❌ Vous ne pouvez pas mute un admin",
        ephemeral: true,
      });
    }

    // Verify if the user is not the caller
    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: "❌ Tu ne peux pas te mute toi-même",
        ephemeral: true,
      });
    }

    // Kick User
    try {
      member.timeout(time * 60000);
      await interaction.editReply(
        `✅ <@${user.id}> a été mute pour ${time} minutes`
      );
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply("❌ Impossible de mute le membre");
    }
  },
};
