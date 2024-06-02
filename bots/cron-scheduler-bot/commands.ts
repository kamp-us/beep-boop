import { SlashCommandBuilder } from "discord.js";
import type { CommandCollection } from "./types";

export const commands: CommandCollection = {
  healthcheck: {
    builder: new SlashCommandBuilder().setDescription(
      "Check if the bot is healthy.",
    ),
    async handler(interaction) {
      await interaction.reply("I'm healthy!");
    },
  },
};
