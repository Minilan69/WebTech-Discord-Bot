// Imports
const { Events, PermissionsBitField } = require("discord.js");

// Event Responde
module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (
      message.content.trim().endsWith(`<@${message.client.user.id}>`) && // See if the bot is mentioned at the end of the message
      message.member.permissions.has(PermissionsBitField.Flags.Administrator) && // Verify if the author has the administrator permission
      message.author.id !== message.client.user.id // Check if the author is not the bot
    ) {
      try {
        // Message Content
        const contentWithoutMention = message.content
          .replace(`<@${message.client.user.id}>`, "")
          .trim();
        const attachmentUrls = message.attachments.map(
          (attachment) => attachment.url
        );

        // Embeds
        const embeds = message.embeds;

        // Empty Message
        if (
          !contentWithoutMention &&
          attachmentUrls.length === 0 
        ) {
          return message.reply("❌ Un message ne peut pas être vide");
        }

        // Message
        await message.channel.send({
          content: contentWithoutMention,
          files: attachmentUrls,
          embeds: embeds,
        });

        await message.delete();
        console.log(`[✅PASS] Message copié avec succès`);
      } catch (error) {
        // ERROR Section
        console.error("[❌ERROR]", error);
        await message.reply("❌ Impossible d'envoyer le message");
      }
    }
  },
};
