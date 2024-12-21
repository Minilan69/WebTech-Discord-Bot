// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Permet de kick un membre")
    .addUserOption((option) =>
      option
        .setName("membre")
        .setDescription("Le membre à kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("raison")
        .setDescription("La raison du kick")
        .setRequired(true)
    ),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const user = interaction.options.getUser("membre");
    const member = await interaction.guild.members.fetch(user.id);
    const reason = interaction.options.getString("raison");

    // Verify is not an admin
    if (member.roles.cache.has("1315425516853133404")) {
      return interaction.editReply({
        content: "❌ Vous ne pouvez pas kick un admin",
        ephemeral: true,
      });
    }

    // Verify if the user is not the bot
    if (member.user.id === interaction.client.user.id) {
      return interaction.reply("❌Vous ne pouvez pas kick le bot");
    }

    // Verify if the user is not the caller
    if (user.id === interaction.user.id) {
      return interaction.editReply({
        content: "❌ Tu ne peux pas te kick toi-même",
        ephemeral: true,
      });
    }

    // Kick User
    try {
      member.kick(reason);
      await interaction.editReply(`✅ <@${user.id}> a été kick\n
        Raison: ${reason}`);
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply("❌ Impossible de kick le membre");
    }
  },
};
