#!/usr/bin/env node
const { execSync } = require('child_process');

const runCommand = command => {
    try{
        execSync(`${command}`, {stdio: 'inherit'});
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/aleleba/create-react-component-library ${repoName}`;
const installDepsCommand = `cd ${repoName} && rm -rf .git && git init && git add . && git commit -m "Initial commit" && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(-1);

console.log("Congratulations! You are ready. Follow the following commands to start");
console.log(`cd ${repoName}`);
console.log('Create a .env file with LIBRARY_NAME=your_library_name(default: ui-library), External_CSS (optional)(Default: false), EXTERNAL_CSS_NAME=(optional)(Default: index.css)');
console.log(`Then you can run: npm start`);