import chalk from 'chalk';
import Listr from 'listr';
import path from 'path';
import { fileURLToPath } from 'url';
import { Options } from './types';
import { copyTemplateFiles } from './utils/copy-template-files';

export async function createFiles(options: Options) {
	const currentFileUrl = import.meta.url;
	const sourceDir = path.resolve(
		decodeURI(fileURLToPath(currentFileUrl)),
		'../../templates'
	);
	const targetDir = `${process.cwd()}/components/${options.dir}/${
		options.name
	}`;

	const tasks = new Listr([
		{
			title: 'Copy files',
			task: () =>
				copyTemplateFiles(
					sourceDir,
					targetDir,
					options.name,
					options.storybook
				),
		},
	]);

	try {
		await tasks.run();

		console.log('%s Files are ready', chalk.green.bold('DONE'));
	} catch (error) {
		console.log('%s Error occurred', chalk.red.bold('ERROR'));
	}
}
