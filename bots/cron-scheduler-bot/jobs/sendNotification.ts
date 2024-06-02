import { Client } from "discord.js";
import { createClient } from "@supabase/supabase-js";
import { env } from "../env";

// const { SUPABASE_URL, SUPABASE_KEY } = env;

// const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

interface Params {
  channelId: string;
}

export const sendNotification = async (
  client: Client,
  params: Params,
): Promise<void> => {
  const { channelId } = params;
  console.log(
    `Running anotherScheduledFunction with param: ${channelId} at`,
    new Date(),
  );

  // try {
  //   const { data: messages, error } = await supabase
  //     .from("notifications")
  //     .select("message")
  //     .eq("status", "pending");

  //   if (error) {
  //     throw error;
  //   }

  //   const channel = await client.channels.fetch(channelId);
  //   if (channel && channel.isTextBased()) {
  //     for (const { message } of messages) {
  //       await channel.send(message);
  //       console.log(`Message sent: "${message}" at`, new Date());
  //       await supabase
  //         .from("notifications")
  //         .update({ status: "sent" })
  //         .eq("message", message);
  //     }
  //   }
  // } catch (error) {
  //   console.error("Error fetching or sending messages:", error);
  // }
};
