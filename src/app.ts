import { Client, Message, Guild, Collection } from 'discord.js';
import * as fs from 'fs';
import { Commands } from '@/interfaces';
import * as dotenv from 'dotenv';
import automations from './automations';
import axios from "axios";

dotenv.config();
const env = process.env;

const client = new Client();
const commands = new Collection<string, Commands>();

const commandFiles = fs.readdirSync(`${env.COMMAND_PATH}commands`).filter(file => file.endsWith(env.EXT));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(
        `Add the bot to your server here:\nhttps://discordapp.com/oauth2/authorize?client_id=${
            client.user.id
        }&scope=bot&permissions=268757104`
    );
});

client.on('message', (message: Message) => {
    if (!message.content.startsWith(env.PREFIX) || message.author.bot) return;
    let args: string[] | string = message.content.slice(env.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (message.content.startsWith(env.PREFIX)+'create' ) {
        args = message.content.slice(env.PREFIX.length+6).trim();
    }

    if (!commands.has(command)) return;

    try {
        commands.get(command).execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.on('guildCreate', async (guild: Guild) => {
    console.log(guild);
    const data = {
        guildId: guild.id,
        createdTimestamp: Number(guild.createdTimestamp)
    };
    axios.post(`${env.SERVER}guild`, data).then( async () => {
        await client.users.fetch(guild.ownerID).then(owner => {
            automations.sendWelcomeMsg(owner);
        });
    });
});

client.login(env.TOKEN);
