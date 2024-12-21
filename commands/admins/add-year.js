// Imports
const { SlashCommandBuilder } = require("discord.js");

// Command's Attributes
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ajouter-année")
    .setDescription("Permet d'ajouter une année à tout les étudiants webtech"),
  // Execution
  async execute(interaction) {
    await interaction.deferReply();
    const failedMembers = [];
    try {

      const members = await interaction.guild.members.fetch();

      const roleMembers = members.filter((member) =>
        member.roles.cache.has("1315319863685939220")
      );

      let memberDetails = "";
      for (const member of roleMembers.values()) {
        const nickname = member.nickname.slice(0, -1);
        const lastchar = parseInt(member.nickname.slice(-1), 10);
        try {
          if (lastchar >= 1 && lastchar <= 4) {
            const newlastchar = String(lastchar + 1);
            await member.setNickname(nickname + newlastchar);
          } else if (lastchar == 5) {
            await member.roles.add("1317826544055615498");
            await member.roles.remove("1315319863685939220");
            await member.setNickname("");
          }
        } catch (error) {
          console.error(`[❗WARNING] With ${member.nickname}`, error);
          failedMembers.push(`<@${member.id}>`);
        }
      }

      if (failedMembers.length === 0) {
        await interaction.editReply({
          content: `✅ **L'année supplémentaire a bien été ajoutée à tous les étudiants**`,
        });
      } else {
        await interaction.editReply({
          content: `❗ **L'année supplémentaire a été ajoutée à tout les étudiants sauf :**\n       ${failedMembers.join(
            "\n"
          )}\n`,
        });
      }
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply({
        content: "❌ Une erreur est survenue en traitant la demande.",
        ephemeral: true,
      });
    }
  },
};
