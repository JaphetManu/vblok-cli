import * as fs from 'fs';
import * as path from 'path';
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
async function copyTemplateFiles(targetDirPath, fileName, includeStorybook) {
    const componentDir = targetDirPath.split('/')[1];
    const sourceDirPath = path.join('./src/templates');
    let cssClassName = '';
    let storybookTitle = '';
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
        ? fs.readdirSync(sourceDirPath)
        : fs.readdirSync(sourceDirPath).filter((file) => !file.includes('stories.js'));
    fs.mkdirSync(targetDirPath, { recursive: true });
    for (const file of templateFileNames) {
        const targetFileName = renameFile(file, fileName);
        const fileContents = fs
            .readFileSync(`${sourceDirPath}/${file}`, 'utf8')
            .replace(/FILENAME/g, fileName)
            .replace(/CSS_CLASS/g, cssClassName)
            .replace(/STORYBOOK_TITLE/g, storybookTitle)
            .replace(/STORYBOOK_NAME/g, capitalizeFirstLetter(fileName));
        fs.writeFileSync(`${targetDirPath}/${targetFileName}`, fileContents);
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

function cli(args) {
    const options = parseArgumentsIntoOptions(args);
    const targetDir = `components/${options.dir}`;
    copyTemplateFiles(targetDir, options.name, options.storybook);
}

export { cli };
