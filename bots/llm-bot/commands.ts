import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";
import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import type { CommandCollection } from "./types";

export const commands: CommandCollection = {
	healthcheck: {
		builder: new SlashCommandBuilder().setDescription("Check if the bot is healthy."),
		async handler(interaction) {
			await interaction.reply("I'm healthy!");
		},
	},
	ask: {
		builder: new SlashCommandBuilder()
			.setDescription("Ask a question.")
			.addStringOption((option) =>
				option.setName("question").setDescription("The question to ask.").setRequired(true),
			)
			.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
			.setDMPermission(true),
		async handler(interaction) {
			const question = interaction.options.getString("question");
			await interaction.deferReply();

			if (question) {
				try {
					const answer = await streamText({
						model: openai("gpt-4o"),
						system:
							"You are a helpful assistant. Never return a response more than 1500 characters",
						maxTokens: 512,
						prompt: question,
					});

					let content = "";
					let pendingChunk = "";
					for await (const chunk of answer.textStream) {
						if (pendingChunk.length + chunk.length < 100) {
							pendingChunk = pendingChunk + chunk;
							continue;
						}

						if (content.length + pendingChunk.length < 2000) {
							content = content + pendingChunk;
							pendingChunk = "";
							await interaction.editReply({ content });
						} else {
							content = pendingChunk = chunk;
							await interaction.followUp({ content });
						}
					}

					if (content.length + pendingChunk.length < 2000) {
						content = content + pendingChunk;
						pendingChunk = "";
						await interaction.editReply({ content });
					} else {
						content = pendingChunk;
						await interaction.followUp({ content });
					}
				} catch (error) {
					console.error(error);
				}
			}
		},
	},
};
