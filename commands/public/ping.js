// Imports
const { SlashCommandBuilder } = require("discord.js");
const os = require("os");
const process = require("process");

// Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(
      "Affiche le ping du bot et les informations du serveur distant"
    ),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const botLatency = sent.createdTimestamp - interaction.createdTimestamp;
      const apiLatency = Math.round(interaction.client.ws.ping);

      const botUptime = formatUptime(process.uptime());

      const cpuUsage = process.cpuUsage();
      const memoryUsage = process.memoryUsage();

      // 4. Message de réponse
      await interaction.editReply(
        `🏓 **Pong ! Voici les informations :**\n
        🔹 **Ping du bot :** \`${botLatency}ms\`\n
        🔹 **Latence API Discord :** \`${apiLatency}ms\`\n
        🕒 **Uptime du bot :** \`${botUptime}\`\n
        ⚙️ **CPU :** \`${cpuUsage.user / 1000} ms (User)\` | \`${
          cpuUsage.system / 1000
        } ms (System)\`
        `
      );
    } catch (error) {
      console.error("[❌ERROR]", error);
      await interaction.editReply(
        "❌ Impossible de ping"
      );
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
