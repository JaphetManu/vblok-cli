import arg from 'arg';

import type { Args, Options } from '../types';

export function parseArgumentsIntoOptions(rawArgs: Args): Options {
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
