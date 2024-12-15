const { Events, MessageFlags } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found`);
      return;
    }

    try {
      await command.execute(interaction);
      console.log(`${interaction.commandName}.js Succeed`);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Il y a eu une erreur pendant l'exécution de la commande !",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "Il y a eu une erreur pendant l'exécution de la commande !",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
