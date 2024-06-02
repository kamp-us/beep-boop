import Debug from "debug";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { commands } from "../commands";
import { jobFunctions, runJob } from "../jobs";
import jobs from "../jobs/cron_jobs.json";
import cron from "node-cron";
import { env } from "../env";

const debug = Debug("cron-scheduler-bot:start");
debug.enabled = true;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
  debug(`Ready! Logged in as ${c.user.username}`);
  console.log("Bot is ready!");

  try {
    jobs.forEach((job) => {
      cron.schedule(job.schedule, () => runJob(job, jobFunctions, client));
    });

    console.log("Cron jobs scheduled successfully.");
  } catch (err) {
    console.error("Error reading cron jobs configuration:", err);
  }
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

client.login(env.DISCORD_TOKEN);
