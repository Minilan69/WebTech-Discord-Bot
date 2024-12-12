// Import
const { Client, Events, GatewayIntentBits, time, TimestampStyles } = require("discord.js");
const { token } = require("./config.json");

// New instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, (readyClient) => {
  console.log(
    `Connected as ${readyClient.user.username} at ${Date()}`
  );
});

// Launch Bot
client.login(token);