// Imports
const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("fs");
const path = require("path");

// Commands List
async function getCommands() {
  const commands = [];
  const foldersPath = path.join(__dirname, "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if (folder === "admins") {
        command.data.default_member_permissions = "8";
      }

      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
      } else {
        console.log(`[WARNING] ${filePath} missing property`);
      }
    }
  }

  return commands;
}

// Update Commands
async function deployCommands() {
  const commands = await getCommands();

  const rest = new REST().setToken(token);

  try {
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: commands,
      }
    );

    console.log(`Create ${data.length} commands`);
  } catch (error) {
    console.error("[ERROR]", error);
  }
}

// Export
module.exports = {
  deployCommands,
};
