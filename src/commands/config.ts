import { join } from 'node:path';
import { homedir } from 'node:os';
import { existsSync } from 'node:fs';
import { Command, Flags } from '@oclif/core';
import { readFile, writeFile } from 'node:fs/promises';

export default class Config extends Command {
	static override description = 'Set information required by ddrive';

	static override flags = {
		token: Flags.string({
			description: 'The bot token for accessing Discord API',
			char: 't',
		}),
		channel: Flags.string({
			description: 'The id of the channel to store files in',
			char: 'c',
		}),
	};

	async run(): Promise<void> {
		const { flags } = await this.parse(Config);
		const configFilePath = join(homedir(), 'ddrive_config.json');
		try {
			if (existsSync(configFilePath)) {
				const configData = await readFile(configFilePath, 'utf-8');
				const newConfigData = JSON.stringify({
					...JSON.parse(configData),
					...flags,
				});
				await writeFile(configFilePath, newConfigData);
			} else {
				const configData = JSON.stringify(flags);
				await writeFile(configFilePath, configData);
			}
			this.log('Updated Config successfully!');
		} catch (error) {
			console.error(error);
		}
	}
}
