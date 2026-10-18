# Create React Component Library

This project aims to have a starter kit for creating a new React Library with storybook.

## Tech stack
Current package version: **1.4.3** (Node 24 in CI).

| Tool | Version |
| --- | --- |
| React / React DOM | 19.3.1 |
| TypeScript | 6.0.3 |
| Webpack / webpack-cli | 5.112.0 / 7.2.3 |
| Babel | 8.0.7 |
| Storybook | 10.6.2 |
| Jest / ts-jest | 30.5.2 / 29.4.15 |
| Cypress | 16.2.0 |
| ESLint / typescript-eslint | 9.39.5 / 8.71.2 |
| Sass | 1.105.2 |

TypeScript and ESLint are kept on their current major on purpose: `ts-jest` and `typescript-eslint` do not support TypeScript 7 yet, and `eslint-plugin-react` does not support ESLint 10 yet.

## Setup
To create a new project run in the terminal:
```
npx @aleleba/create-react-component-library react-library
```
Then run:
```
cd react-library
```
You will need to create a new .env file at the root of the project for global config.
This is an exaple of config.
```
#Library Name (Default: ui-library)
LIBRARY_NAME=ui-library
#External CSS (Default: false)
EXTERNAL_CSS=true
#External CSS NAME (Default: index.css)
EXTERNAL_CSS_NAME=other_name.css
#PREFIX URL (Default: '')
PREFIX_URL=
```

### For Development
In the terminal run:
```
npm run start
```
You will find the components on:
```
scr/components
```
You will find stories of storybook on:
```
scr/stories
```

This will start the app-library in development mode, also it have Hot Reloading!
Enjoy coding!

### For Production
In the terminal run:
```
npm run build
```
It will create a dist folder and run:
```
npm publish
```
This will publish on npm your package.

## Cheers
Hope you enjoy this proyect! Sincerely Alejandro Lembke Barrientos.