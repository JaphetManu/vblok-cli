# vblok-cli

A simple cli to dynamically created Vue, Scss and Storybook files for new components or modules in Vue.js and Nuxt.js projects. It is still in early development and will later be optimized to automatically serve storyblok cms content without having to copy & pasty a lot of boilerplate code.

## Installation

Install the cli by running `npm install vblok-cli` or `yarn add vblok-cli`

## Usage

_By default, components and modules created with vblok-cli are stored in the **`components`** folder of the project root directory._

### Basic Usage

`vblok <targetFolder> <name>`

### Available Options

`--storybook` or `-s` to add a storybook file to the created component

### Examples

1.  `vblok app Footer` creates a Footer.vue and Footer.scss file in the directory `components/app/Footer`
2.  `vblok base Button -s` creates a Button.vue, Button.scss and Button.stories.js file in the directory `components/base/Button`
3.  `vblok modules CmLanding -s` creates CmLanding.vue, CmLanding.scss and CmLanding.stories.js in the directory `components/modules/CmLanding`
4.  `vblok modules/teaser TmHighlight -s` creates TmHighlight.vue, TmHighlight.scss and TmHighlight.stories.js in the directory `components/modules/teaser`

## License

[MIT](https://github.com/JaphetManu/vblok-cli/blob/master/LICENSE)
