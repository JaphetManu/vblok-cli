import { createFiles } from './main';
import type { Args } from './types';
import { parseArgumentsIntoOptions } from './utils/parse-arguments-into-options';

export async function cli(args: Args) {
	const options = parseArgumentsIntoOptions(args);

	await createFiles(options);
}
