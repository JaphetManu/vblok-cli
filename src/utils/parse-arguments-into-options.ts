import arg from 'arg';

import type { Args, RawOptions } from '../types';

export function parseArgumentsIntoOptions(rawArgs: Args): RawOptions {
	const args = arg(
		{
			'--storybook': Boolean,
			'-s': '--storybook',
		},
		{
			argv: rawArgs.slice(2),
		}
	);

	return {
		dir: args._[0],
		name: args._[1],
		storybook: args['--storybook'] || false,
	};
}
