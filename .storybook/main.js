const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [
    "@storybook/addon-links", 
    "@storybook/addon-essentials", 
    "@storybook/addon-interactions", 
    "@storybook/addon-postcss",
    "@storybook/preset-scss"
  ],
  "webpackFinal": async config => {
    config.resolve.alias = { ...config.resolve.alias,
      '@Components': path.resolve(__dirname, "../src/Components/")
    };
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
  "framework": "@storybook/react",
  core: {
    builder: "webpack5"
  },
  typescript: {
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        "paths": {
          "@Components/*": ["Components/*"],
        },
      }
    }
  },
};