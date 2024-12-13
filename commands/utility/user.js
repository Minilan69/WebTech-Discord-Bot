const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Donne des informations sur l'utilisateur"),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      `Cette commande à été exécuté par ${interaction.user.username}, qui a rejoin le ${interaction.member.joinedAt}`
    );
  },
};
