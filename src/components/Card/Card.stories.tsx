import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Card } from '@components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Card> = {
	title: 'Example/Card',
	component: Card,
	parameters: {
		docs: {
			description: {
				component: 'A reusable Card component for displaying content with an optional title.',
			},
		},
	},
	argTypes: {
		title: {
			control: 'text',
			description: 'The title of the card',
		},
		children: {
			control: false,
			description: 'The content to display inside the card',
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Basic: Story = {
	args: {
		title: 'Test Title',
		children: <p>Test Content</p>,
	},
};
