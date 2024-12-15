const { Events, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const channelId = "1315041017875009546";
    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) {
      console.error("Salon de bienvenue introuvable");
      return;
    }

    const avatarUrl = member.user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 256,
    });
    const image = new AttachmentBuilder("assets/WebTech-Full.png");
    const footer = new AttachmentBuilder("assets/Webtech-Logo.png");

    const name =
      member.nickname ||
      member.user.globalName ||
      member.user.username ||
      "Pseudo Non Récupérable";

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

    try {
      channel.send({
        content: `<@${member.user.id}>`,
        embeds: [embed],
        files: [image, footer],
      });
      console.log(`${member.user.tag} join the server`);
    } catch (error) {
      console.error("[ERROR]", error);
    }
  },
};
