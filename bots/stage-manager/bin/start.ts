import Debug from "debug";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { type CommandCollection, commands } from "../commands";

const debug = Debug("stage-manager:start");
debug.enabled = true;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
	debug(`Ready! Logged in as ${c.user.username}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	debug(`Received command: ${interaction.commandName} from user: ${interaction.user.username}`);

	const command = (commands as CommandCollection)[interaction.commandName];
	if (!command) {
		debug(`Command not found: ${interaction.commandName}`);
		return;
	}

	try {
		debug(`Executing command: ${interaction.commandName}`);
		await command.handler(interaction);
	} catch (error) {
		debug(`Error while executing command: ${interaction.commandName}`);
		if (interaction.deferred || interaction.replied) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
});

client.login(process.env.DISCORD_TOKEN);
