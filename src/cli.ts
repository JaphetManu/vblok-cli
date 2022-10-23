import type { Args } from './types';
import { copyTemplateFiles } from './utils/copy-template-files';
import { parseArgumentsIntoOptions } from './utils/parse-arguments-into-options';

export function cli(args: Args) {
	const options = parseArgumentsIntoOptions(args);
	const targetDir = `components/${options.dir}`;

	copyTemplateFiles(targetDir, options.name, options.storybook);
}
