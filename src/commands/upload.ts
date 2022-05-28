import { fetch, FormData } from 'undici';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { readFile } from 'node:fs/promises';
import { Command, Flags } from '@oclif/core';
import { existsSync, readFileSync } from 'node:fs';
import { Blob } from 'node:buffer';

export default class Upload extends Command {
	static override description = 'Upload a file';

	static override flags = {
		file: Flags.string({
			description: 'The path of the file to upload',
			char: 'f',
			required: true,
		}),
	};

	async run(): Promise<void> {
		const { flags } = await this.parse(Upload);
		const configFilePath = join(homedir(), 'ddrive_config.json');
		if (!existsSync(configFilePath)) {
			this.error('Config file not found. Run "ddrive config" command to create one');
		}
		const configData = await readFile(configFilePath, 'utf8');
		const { token, channel } = JSON.parse(configData);
		if (!token) this.error('Token not defined in config. Run "ddrive config -t <token>" to add token');
		if (!channel) this.error('Channel not defined in config. Run "ddrive config -c <channel_id>" to add channel');
		const url = `https://discord.com/api/v10/channels/${channel}/messages`;
		const formData = new FormData();
		const fileName = flags.file.split('/').at(-1) as string;
		const fileBuffer = readFileSync(flags.file);
		formData.append(fileName, new Blob([fileBuffer]), fileName);
		fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bot ${token}`,
			},
			body: formData,
		});
	}
}
