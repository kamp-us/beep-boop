import { type ChatInputCommandInteraction, GuildScheduledEventManager } from "discord.js";

export type CommandCollection = Record<
	string,
	{
		description: string;
		handler: (interaction: ChatInputCommandInteraction) => Promise<void>;
	}
>;

export const commands = {
	whoami: {
		description: "Provides information about the user who invoked the command.",
		async handler(interaction) {
			await interaction.reply(`You are ${interaction.user.username}!`);
		},
	},
	"list-events": {
		description: "Lists all events in the server.",
		async handler(interaction) {
			const guild = interaction.guild;
			if (!guild) {
				await interaction.reply("This command must be run in a server!");
				return;
			}

			const events = await guild.scheduledEvents.fetch();

			console.log(
				events.map((event) => {
					return {
						name: event.name,
						description: event.description,
						endAt: event.scheduledEndAt,
						endTimestamp: event.scheduledEndTimestamp,
						startAt: event.scheduledStartAt,
						startTimestamp: event.scheduledStartTimestamp,
						url: event.url,
						status: event.status,
					};
				}),
			);

			await interaction.reply(`There are ${events.size} events in this server!`);
		},
	},
	"create-event": {
		description: "Creates a new event in the server.",
		async handler(interaction) {
			const guild = interaction.guild;
			if (!guild) {
				await interaction.reply("This command must be run in a server!");
				return;
			}
		},
	},
} satisfies CommandCollection;
