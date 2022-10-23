import FILENAME from './FILENAME.vue';

export default {
	title: 'STORYBOOK_TITLE',
	component: FILENAME,
};

const Template = (args) => ({
	components: { FILENAME },
	setup() {
		return {
			args,
		};
	},
	template: '<FILENAME v-bind="args" />',
	props: Object.keys(args),
});

export const Story = Template.bind({});
Story.storyName = 'STORYBOOK_NAME';
Story.args = {};
