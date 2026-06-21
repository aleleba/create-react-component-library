const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const deFaultValues = {
	PREFIX_URL: ''
};
const prefixUrl = process.env.PREFIX_URL ? process.env.PREFIX_URL : deFaultValues.PREFIX_URL;

module.exports = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

	addons: ['@storybook/addon-webpack5-compiler-babel', '@storybook/addon-links', {
		name: '@storybook/addon-styling-webpack',
		options: {
			rules: [
				{
					test: /\.(css|sass|scss)$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: {
									namedExport: false,
									exportLocalsConvention: 'as-is',
									auto: /\.module\.\w+$/i,
								}
							},
						},
						'sass-loader',
					],
				}
			]
		},
	}, '@storybook/addon-docs'],

	webpackFinal: async config => {
		config.entry = config.entry.map(function(entry) {
			if (entry.includes('webpack-hot-middleware')) {
				return `${require.resolve('webpack-hot-middleware/client')}?path=${prefixUrl}__webpack_hmr&reload=true`;
			}
			return entry;
		});
		config.resolve.alias = {
			...config.resolve.alias,
			'@components': path.resolve(__dirname, '../src/components/')
		};
		config.resolve.plugins = [new TsconfigPathsPlugin()];
		return config;
	},

	framework: {
		name: '@storybook/react-webpack5',
		options: {}
	},

	typescript: {
		reactDocgenTypescriptOptions: {
			compilerOptions: {
				'paths': {
					'@Components/*': ['Components/*']
				}
			},
			propFilter: (prop) => {
				// Filter out props that might contain Symbol values
				if (prop.name && typeof prop.name === 'symbol') {
					return false;
				}
				// Filter out React internal props that might cause issues
				if (prop.name && prop.name.startsWith('$$')) {
					return false;
				}
				return true;
			}
		}
	},

	docs: {
		autodocs: 'tag',
		defaultName: 'Docs',
	},

	// Babel 8 removed the `bugfixes` option from @babel/preset-env (it's now always on).
	// Storybook injects bugfixes:true in its internal overrides AFTER babelDefault, so we
	// strip it here in the `babel` hook which runs after all presets have composed the config.
	async babel(config) {
		const stripBugfixes = preset => {
			if (!Array.isArray(preset)) return preset;
			const [name, options] = preset;
			if (typeof name === 'string' && name.includes('@babel/preset-env') && options?.bugfixes !== undefined) {
				const { bugfixes: _removed, ...rest } = options;
				return [name, rest];
			}
			return preset;
		};
		if (config.presets) {
			config.presets = config.presets.map(stripBugfixes);
		}
		if (config.overrides) {
			config.overrides = config.overrides.map(override => {
				if (!override.presets) return override;
				return { ...override, presets: override.presets.map(stripBugfixes) };
			});
		}
		return config;
	},
};
