#!/usr/bin/env node
const { execSync } = require('child_process');
const isWin = process.platform === "win32";

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
const installDepsCommand = `cd ${repoName} && npm install`;
const cleanGitHistoryCommand = `cd ${repoName} && rm -rf .git && git init && git add --all -- ":!.github" ":!bin" && git commit -m "Initial commit"`
const cleanGitHistoryCommandWindows = `cd ${repoName} && rmdir .git /s /q && git init && git add --all -- ":!.github" ":!bin" && git commit -m "Initial commit"`
const deleteFoldersCommand = `cd ${repoName} && rm -rf .github && rm -rf bin`
const deleteFoldersCommandWindows = `cd ${repoName} && rmdir .github /s /q && rmdir bin /s /q`

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(-1);

console.log(`Cleaning History of Git for ${repoName}`);
const cleanGitHistory = isWin ? runCommand(cleanGitHistoryCommandWindows) : runCommand(cleanGitHistoryCommand);
if(!cleanGitHistory) process.exit(-1);

console.log("Congratulations! You are ready. Follow the following commands to start");
console.log(`cd ${repoName}`);
console.log('Create a .env file with LIBRARY_NAME=your_library_name(default: ui-library), External_CSS (optional)(Default: false), EXTERNAL_CSS_NAME=(optional)(Default: index.css)');
console.log(`Then you can run: npm start`);

const deleteFolders = isWin ? runCommand(deleteFoldersCommandWindows) : runCommand(deleteFoldersCommand);
if(!deleteFolders) process.exit(-1);