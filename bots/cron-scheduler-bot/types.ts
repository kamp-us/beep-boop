import type {
	ChatInputCommandInteraction,
	SharedSlashCommand,
	SlashCommandBuilder,
} from "discord.js";

/**
 * Defines the structure of a command
 */
export interface Command {
	/**
	 * Slash command builder to define the command
	 *
	 * @param builder - The builder to define the command
	 */
	builder: SharedSlashCommand;
	/**
	 * The function to execute when the command is called
	 *
	 * @param interaction - The interaction of the command
	 */
	handler(interaction: ChatInputCommandInteraction): Promise<void> | void;
}

export type CommandCollection = Record<string, Command>;
