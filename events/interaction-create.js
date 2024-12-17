// Imports
const { Events, MessageFlags } = require("discord.js");

// Event Responde
module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    // Command Don't Exist
    if (!command) {
      console.error(
        `[❌ERROR] ${interaction.commandName} no command with this name`
      );
      return;
    }

    try {
      await command.execute(interaction);
      console.log(`[✅PASS] ${interaction.commandName}.js sucseed`);
    } catch (error) {
      // ERROR Section
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "[❌] Ta commande n'a pas pu aboutir, désolé !",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "[❌] Ta commande n'a pas pu aboutir, désolé !",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
