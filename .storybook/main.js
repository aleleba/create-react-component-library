const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const deFaultValues = {
  PREFIX_URL: ''
}
const prefixUrl = process.env.PREFIX_URL ? process.env.PREFIX_URL : deFaultValues.PREFIX_URL;

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
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
    }
  ],
  webpackFinal: async config => {
    config.entry = config.entry.map(function(entry) {
      if (entry.includes("webpack-hot-middleware")) {
        return `${require.resolve('webpack-hot-middleware/client')}?path=${prefixUrl}__webpack_hmr&reload=true`;
      }
      return entry;
    }),
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, "../src/components/")
    };
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  typescript: {
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        "paths": {
          "@Components/*": ["Components/*"]
        }
      }
    }
  },
  features: {
    previewMdx2: true
  },
  docs: {
    autodocs: true
  }
};