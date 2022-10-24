import chalk from 'chalk';
import Listr from 'listr';
import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import arg from 'arg';

function renameFile(templateFileName, fileName) {
    const fileFormat = templateFileName.split('.').pop();
    switch (fileFormat) {
        case 'js':
            return `${fileName}.stories.${fileFormat}`;
        default:
            return `${fileName}.${fileFormat}`;
    }
}
function capitalizeFirstLetter(wordString) {
    return wordString[0].toUpperCase() + wordString.slice(1);
}
async function copyTemplateFiles(sourceDir, targetDir, fileName, includeStorybook) {
    const componentDir = targetDir.split('/')[targetDir.split('/').length - 2];
    let cssClassName = '';
    let storybookTitle = '';
    console.log(componentDir);
    console.log(fileName);
    switch (componentDir) {
        case 'base':
            cssClassName = 'c-' + fileName.toLowerCase();
            storybookTitle = `${capitalizeFirstLetter(componentDir)}/${capitalizeFirstLetter(fileName)}`;
            break;
        case 'app':
            cssClassName = 'c-' + fileName.toLowerCase();
            storybookTitle = `${capitalizeFirstLetter(componentDir)}/${capitalizeFirstLetter(fileName)}`;
            break;
        default: {
            const nameParts = fileName.split(/(?<=[m])/g);
            cssClassName = `${nameParts[0].toLowerCase()}-${nameParts[1].toLowerCase()}`;
            switch (fileName.charAt(0)) {
                case 'C':
                    storybookTitle = `${capitalizeFirstLetter(componentDir)}/Content ${capitalizeFirstLetter(componentDir)}/${fileName}`;
                    break;
                case 'T':
                    storybookTitle = `${capitalizeFirstLetter(componentDir)}/Teaser ${capitalizeFirstLetter(componentDir)}/${fileName}`;
                    break;
                case 'L':
                    storybookTitle = `${capitalizeFirstLetter(componentDir)}/List ${capitalizeFirstLetter(componentDir)}/${fileName}`;
                    break;
                case 'E':
                    storybookTitle = `${capitalizeFirstLetter(componentDir)}/Extra ${capitalizeFirstLetter(componentDir)}/${fileName}`;
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

async function createFiles(options) {
    const currentFileUrl = import.meta.url;
    const sourceDir = path.resolve(decodeURI(fileURLToPath(currentFileUrl)), '../../templates');
    const targetDir = `${process.cwd()}/components/${options.dir}/${options.name}`;
    const tasks = new Listr([
        {
            title: 'Copy files',
            task: () => copyTemplateFiles(sourceDir, targetDir, options.name, options.storybook),
        },
    ]);
    try {
        await tasks.run();
        console.log('%s Files are ready', chalk.green.bold('DONE'));
    }
    catch (error) {
        console.log('%s Error occurred', chalk.red.bold('ERROR'));
    }
}

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        '--storybook': Boolean,
        '-s': '--storybook',
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        dir: args._[0],
        name: args._[1],
        storybook: args['--storybook'] || false,
    };
}

async function cli(args) {
    const options = parseArgumentsIntoOptions(args);
    await createFiles(options);
}

export { cli };
