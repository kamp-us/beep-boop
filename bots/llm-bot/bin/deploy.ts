import Debug from "debug";
import { REST, Routes } from "discord.js";
import { commands } from "../commands";
import { env } from "../env";

const debug = Debug("llm-bot:deploy");
debug.enabled = true;

const rest = new REST({ version: "10" }).setToken(env.DISCORD_TOKEN);

const deploy = async () => {
	try {
		debug(`Started refreshing ${Object.keys(commands).length} application (/) commands`);

		const body = Object.entries(commands).map(([name, command]) =>
			command.builder.setName(name).toJSON(),
		);

		const data = (await rest.put(
			Routes.applicationGuildCommands(env.DISCORD_APP_ID, env.DISCORD_SERVER_ID),
			{ body },
		)) as unknown[];

		debug(`Successfully deployed ${data.length} application (/) commands!`);
	} catch (error) {
		debug(error);
	}
};

deploy();
