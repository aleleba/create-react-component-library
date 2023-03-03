import { defineConfig } from "cypress";
import webpackConfig from './webpack.cy.config';

export default defineConfig({
  component: {
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: webpackConfig,
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
