import { sendNotification } from "./sendNotification.ts";
import { anotherScheduledFunction } from "./anotherScheduledFunction.ts";
import type { Client } from "discord.js";

export const jobFunctions = {
  sendNotification,
  anotherScheduledFunction,
};

export interface Job {
  schedule: string;
  function: string;
  params: Record<string, any>;
}

export const runJob = async (
  job: Job,
  jobFunctions: Record<string, Function>,
  client: Client,
): Promise<void> => {
  const jobFunction = jobFunctions[job.function];
  if (jobFunction) {
    await jobFunction(client, job.params);
  } else {
    console.log(`No function found for job type: ${job.function}`);
  }
};
