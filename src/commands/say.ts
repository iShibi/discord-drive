import { fetch } from 'undici';
import { join } from 'node:path';
import { Command, Flags } from '@oclif/core';
import { readFile } from 'node:fs/promises';

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
		const config = await readFile(join(this.config.configDir, 'config.json'), 'utf8');
		const { token, channel } = JSON.parse(config);
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
