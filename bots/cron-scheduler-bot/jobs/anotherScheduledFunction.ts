import { Client } from "discord.js";

interface Params {
  someParam: string;
}

export const anotherScheduledFunction = async (
  client: Client,
  params: Params,
): Promise<void> => {
  const { someParam } = params;
  console.log(
    `Running anotherScheduledFunction with param: ${someParam} at`,
    new Date(),
  );
  // Implement your function logic here
};
