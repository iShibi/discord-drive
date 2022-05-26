import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { Command, Flags } from '@oclif/core';

export default class Config extends Command {
	static override description = 'Set information required by ddrive';

	static override flags = {
		token: Flags.string({
			description: 'The bot token for accessing Discord API',
			char: 't',
			required: true,
		}),
		channel: Flags.string({
			description: 'The id of the channel to store files in',
			char: 'c',
			required: true,
		}),
	};

	async run(): Promise<void> {
		const { flags } = await this.parse(Config);
		try {
			await writeFile(
				join(this.config.configDir, 'config.json'),
				JSON.stringify({
					token: flags.token,
					channel: flags.channel,
				}),
			);
			this.log('Config update successfully!');
		} catch (error) {
			console.error(error);
		}
	}
}
