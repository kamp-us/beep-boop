import { parseEnv, z } from "znv";

export const env = parseEnv(process.env, {
	DISCORD_TOKEN: z.string(),
	DISCORD_APP_ID: z.string(),
	DISCORD_SERVER_ID: z.string(),
	OPENAI_API_KEY: z.string(),
});
