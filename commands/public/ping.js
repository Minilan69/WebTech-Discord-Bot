const { SlashCommandBuilder } = require("discord.js");
const os = require("os");
const process = require("process");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(
      "Affiche le ping du bot et les informations du serveur distant"
    ),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      // Ping du bot et de l'API Discord
      const sent = await interaction.followUp({
        content: "Calcul en cours...",
        fetchReply: true,
      });
      const botLatency = sent.createdTimestamp - interaction.createdTimestamp;
      let apiLatency = Math.round(interaction.client.ws.ping);
      if (apiLatency == -1) {
        apiLatency = 0;
      }
      const botUptime = formatUptime(process.uptime());

      // Message final
      await interaction.editReply(
        `
        🔹 **Ping du bot :** ${botLatency}ms\n🔹 **Latence API Discord :** ${apiLatency}ms\n🔹 **Uptime du bot :** ${botUptime}
        `
      );
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply("❌ Impossible de ping");
    }
  },
};

// Fonction pour formater l'uptime
function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}j ${h}h ${m}m ${s}s`;
}