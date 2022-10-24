import * as fs from 'fs';

function renameFile(templateFileName: String, fileName: String) {
	const fileFormat = templateFileName.split('.').pop();

	switch (fileFormat) {
		case 'js':
			return `${fileName}.stories.${fileFormat}`;
		default:
			return `${fileName}.${fileFormat}`;
	}
}

function capitalizeFirstLetter(wordString: String) {
	return wordString[0].toUpperCase() + wordString.slice(1);
}

export async function copyTemplateFiles(
	sourceDir: string,
	targetDir: string,
	fileName: string,
	includeStorybook: Boolean
) {
	const componentDir: String =
		targetDir.split('/')[targetDir.split('/').length - 2];
	let cssClassName = '';
	let storybookTitle = '';

	console.log(componentDir);
	console.log(fileName);

	switch (componentDir) {
		case 'base':
			cssClassName = 'c-' + fileName.toLowerCase();
			storybookTitle = `${capitalizeFirstLetter(
				componentDir
			)}/${capitalizeFirstLetter(fileName)}`;
			break;
		case 'app':
			cssClassName = 'c-' + fileName.toLowerCase();
			storybookTitle = `${capitalizeFirstLetter(
				componentDir
			)}/${capitalizeFirstLetter(fileName)}`;
			break;
		default: {
			const nameParts = fileName.split(/(?<=[m])/g);
			cssClassName = `${nameParts[0].toLowerCase()}-${nameParts[1].toLowerCase()}`;
			switch (fileName.charAt(0)) {
				case 'C':
					storybookTitle = `${capitalizeFirstLetter(
						componentDir
					)}/Content ${capitalizeFirstLetter(componentDir)}/${fileName}`;
					break;
				case 'T':
					storybookTitle = `${capitalizeFirstLetter(
						componentDir
					)}/Teaser ${capitalizeFirstLetter(componentDir)}/${fileName}`;
					break;
				case 'L':
					storybookTitle = `${capitalizeFirstLetter(
						componentDir
					)}/List ${capitalizeFirstLetter(componentDir)}/${fileName}`;
					break;
				case 'E':
					storybookTitle = `${capitalizeFirstLetter(
						componentDir
					)}/Extra ${capitalizeFirstLetter(componentDir)}/${fileName}`;
					break;
			}
			break;
		}
	}

	const templateFileNames = includeStorybook
		? fs.readdirSync(sourceDir)
		: fs.readdirSync(sourceDir).filter((file) => !file.includes('stories.js'));

	fs.mkdirSync(targetDir, { recursive: true });

	for (const file of templateFileNames) {
		const targetFileName = renameFile(file, fileName);
		const fileContents = fs
			.readFileSync(`${sourceDir}/${file}`, 'utf8')
			.replace(/FILENAME/g, fileName)
			.replace(/CSS_CLASS/g, cssClassName)
			.replace(/STORYBOOK_TITLE/g, storybookTitle)
			.replace(/STORYBOOK_NAME/g, capitalizeFirstLetter(fileName));

		fs.writeFileSync(`${targetDir}/${targetFileName}`, fileContents);
	}
}
