// Imports
const { Events, AttachmentBuilder } = require("discord.js");

// Event Responde
module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    // Variables
    const channelId = "1315041017875009546";
    const channel = member.guild.channels.cache.get(channelId);
    const name =
      member.nickname ||
      member.user.globalName ||
      member.user.username ||
      "Pseudo Non Récupérable";
    //Image
    const avatarUrl = member.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 256,
    });
    const image = new AttachmentBuilder("assets/WebTech-Full.png");
    const footer = new AttachmentBuilder("assets/Webtech-Logo.png");

    // Channel Not Found
    if (!channel) {
      console.error("Salon de bienvenue introuvable");
      return;
    }

    // Embed
    const embed = {
      color: 0x8b0000,
      title: `👋 ${name} vien de rejoindre !`,
      description: `🎉 **<@${member.user.id}>** bienvenue ici, ce serveur est fait pour te permettre d'obtenir **les informations** d'ont tu as besoin et de **discuter** avec les élèves 🎓`,
      thumbnail: { url: avatarUrl },
      image: {
        url: "attachment://WebTech-Full.png",
      },
      footer: {
        text: `Vien discuter avec nous ${name} !`,
        icon_url: "attachment://Webtech-Logo.png",
      },
    };

    // Send Message
    try {
      channel.send({
        content: `<@${member.user.id}>`,
        embeds: [embed],
        files: [image, footer],
      });
      console.log(`[✅PASS] ${member.user.tag} join server`);
    } catch (error) {
      // Error
      console.error("[❌ERROR]", error);
    }
  },
};
