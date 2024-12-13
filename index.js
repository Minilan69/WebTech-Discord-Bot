// Import
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

// New instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, (readyClient) => {
  console.log(
    `Connected as ${readyClient.user.username} at ${Date()}`
  );
});

// Command creation
client.commands = new Collection();

// Launch Bot
client.login(token);