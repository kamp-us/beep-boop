import type { ChatInputCommandInteraction } from "discord.js";

export type CommandCollection = Record<
	string,
	{
		description: string;
		handler: (interaction: ChatInputCommandInteraction) => Promise<void>;
	}
>;

export const commands = {
	healthcheck: {
		description: "Check if the bot is healthy.",
		async handler(interaction) {
			await interaction.reply("I'm healthy!");
		},
	},
} satisfies CommandCollection;
