const { Events, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (
      message.mentions.has(message.client.user) && // Vérifie si le bot est mentionné
      message.content.trim().endsWith(`<@${message.client.user.id}>`) && // Assure que la mention est à la fin
      message.member.permissions.has(PermissionsBitField.Flags.Administrator) // Vérifie si l'auteur est admin
    ) {
      try {
        console.log("pass")
        // Supprime la mention du bot du message
        const contentWithoutMention = message.content
          .replace(`<@${message.client.user.id}>`, "")
          .trim();

        if (!contentWithoutMention) {
          return message.reply("❌ Vous ne pouvez pas envoyer un embed vide !");
        }

        // Crée un embed avec le message original
        const embed = new EmbedBuilder()
          .setColor("#8b0000") // Couleur de l'embed
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.displayAvatarURL(),
          })
          .setDescription(contentWithoutMention) // Le contenu du message sans la mention
          .setTimestamp(); // Ajoute un timestamp

        // Envoie l'embed
        await message.channel.send({ embeds: [embed] });

        // Supprime le message original (optionnel)
        await message.delete();
      } catch (error) {
        console.error("[❌ERROR]", error);
        await message.reply("❌ Une erreur est survenue en créant l'embed.");
      }
    }
  },
};
