import { Client, Message } from "discord.js";

export interface Commands {
    name: string,
    description: string,
    execute(message: Message, args: Array<string> | string, client: Client): void | Promise<Message>,
}
