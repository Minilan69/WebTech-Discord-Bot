// Imports
const { Events, PermissionsBitField } = require("discord.js");

// Event Responde
module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (
      message.mentions.has(message.client.user) && // Verify is bot is mentionned
      message.content.trim().endsWith(`<@${message.client.user.id}>`) && // Mention is at the end of the message
      message.member.permissions.has(PermissionsBitField.Flags.Administrator) && // Verify if user have admin permission
      message.author.id !== message.client.user.id // Verify if author is not the bot
    ) {
      try {
        // Remove mention
        const contentWithoutMention = message.content
          .replace(`<@${message.client.user.id}>`, "")
          .trim();

        // Empty message
        if (!contentWithoutMention) {
          return message.reply("❌ Un message ne peux pas être vide");
        }

        // Send message
        await message.channel.send(contentWithoutMention);
        await message.delete();
        console.log(`[✅PASS] message copy sucseed`);
      } catch (error) {
        // ERROR Section
        console.error("[❌ERROR]", error);
        await message.reply("❌ Impossible d'envoyer le message");
      }
    }
  },
};
