import { fetch } from 'undici';
import { join } from 'node:path';
import { Command } from '@oclif/core';
import { readFile } from 'node:fs/promises';

export default class Hello extends Command {
	static override description = 'Say hello in chat';

	async run(): Promise<void> {
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
				content: 'Hello!',
			}),
		});
	}
}
