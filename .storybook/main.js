const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-scss"],
  "webpackFinal": async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, "../src/components/")
    };
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
  "framework": {
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