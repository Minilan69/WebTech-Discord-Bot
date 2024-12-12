// Import
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

// New instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Connected as ${readyClient.user.tag}`);
});

// Launch Bot
client.login(token);
