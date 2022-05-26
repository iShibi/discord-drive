import { fetch } from 'undici';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { readFile } from 'node:fs/promises';
import { Command, Flags } from '@oclif/core';
import { existsSync } from 'node:fs';

export default class Say extends Command {
	static override description = 'Send a text in chat';

	static override flags = {
		text: Flags.string({
			description: 'The text content to send in the chat',
			char: 't',
			required: true,
		}),
	};

	async run(): Promise<void> {
		const { flags } = await this.parse(Say);
		const configFilePath = join(homedir(), 'ddrive_config.json');
		if (!existsSync(configFilePath)) {
			this.error('Config file not found. Run "ddrive config" command to create one');
		}
		const configData = await readFile(configFilePath, 'utf8');
		const { token, channel } = JSON.parse(configData);
		if (!token) this.error('Token not defined in config. Run "ddrive config -t <token>" to add token');
		if (!channel) this.error('Channel not defined in config. Run "ddrive config -c <channel_id>" to add channel');
		const url = `https://discord.com/api/v10/channels/${channel}/messages`;
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${token}`,
			},
			body: JSON.stringify({
				content: flags.text,
			}),
		});
	}
}
