import Debug from "debug";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { commands } from "../commands";
import { TextDecoderStream, TextEncoderStream } from "../polyfill";

globalThis.TextEncoderStream = TextEncoderStream;
globalThis.TextDecoderStream = TextDecoderStream;

const debug = Debug("llm-bot:start");
debug.enabled = true;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
	debug(`Ready! Logged in as ${c.user.username}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const name = interaction.commandName;

	debug(`Received command: ${name} from user: ${interaction.user.username}`);

	const command = commands[name];
	if (!command) {
		debug(`Command not found: ${name}`);
		return;
	}

	try {
		debug(`Executing command: ${name}`);
		await command.handler(interaction);
	} catch (error) {
		debug(`Error while executing command: ${name}`);
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
