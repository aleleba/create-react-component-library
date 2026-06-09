export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		extractArgTypes: (component) => {
			// Filter out Symbol values to prevent serialization errors
			const argTypes = {};
			if (component && component.propTypes) {
				Object.keys(component.propTypes).forEach(key => {
					const propType = component.propTypes[key];
					// Only include non-Symbol values
					if (typeof propType !== 'symbol') {
						argTypes[key] = propType;
					}
				});
			}
			return argTypes;
		},
		source: {
			excludeDecorators: true,
		},
	},
};
export const tags = ['autodocs'];
