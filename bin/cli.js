#!/usr/bin/env node
const { execSync } = require('child_process');
var fs = require('fs');

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

const runCommandWithOutput = command => {
    try{
        return execSync(`${command}`);
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
}

const replaceTextOnFile = ({
    file,
    textToBeReplaced,
    textReplace,
    arrOfObjectsBeReplaced
}) => {
    let data 
    try{
        data = fs.readFileSync(file, 'utf8');
    } catch (e) {
        console.error(`Failed to read file ${file}`, e);
        return false;
    }

    let result
    if(arrOfObjectsBeReplaced){
        arrOfObjectsBeReplaced.forEach( obj => {
            if(result){
                result = result.replace(obj.textToBeReplaced, obj.textReplace).replace(/^\s*[\r\n]/gm, ' ');
            }else{
                result = data.replace(obj.textToBeReplaced, obj.textReplace).replace(/^\s*[\r\n]/gm, ' ');
            }
        })
    }else{
        result = data.replace(textToBeReplaced, textReplace).replace(/^\s*[\r\n]/gm, ' ');
    }

    try{
        console.log('text changed')
        fs.writeFileSync(file, result, 'utf8');
    } catch (e) {
        console.error(`Failed to read file ${file}`, e);
        return false;
    }
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/aleleba/create-react-component-library ${repoName}`;
console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut) process.exit(-1);

const actualVersion = runCommandWithOutput(`cd ${repoName} && node -p "require('./package.json').version"`).toString().trim()

const installDepsCommand = `cd ${repoName} && npm install`;
const cleanGitHistoryCommand = `cd ${repoName} && rm -rf .git && git init && git add --all -- ":!.github" ":!bin" && git commit -m "Initial commit"`
const cleanGitHistoryCommandWindows = `cd ${repoName} && rmdir .git /s /q && git init && git add --all -- ":!.github" ":!bin" && git commit -m "Initial commit"`
const deleteFoldersCommand = `cd ${repoName} && rm -rf .github && rm -rf bin`
const deleteFoldersCommandWindows = `cd ${repoName} && rmdir .github /s /q && rmdir bin /s /q`

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(-1);

console.log(`Replacing Json data for ${repoName}`);
replaceTextOnFile({ 
    file: `./${repoName}/package.json`,
    arrOfObjectsBeReplaced: [
        {
            textToBeReplaced: `"bin": "./bin/cli.js",`, 
            textReplace: ``
        },
        {
            textToBeReplaced: `"version": "${actualVersion}",`, 
            textReplace: `"version": "0.0.1",`
        },
        {
            textToBeReplaced: `"name": "@aleleba/create-react-component-library",`, 
            textReplace: `"name": "${repoName}",`
        }
    ]
})

console.log(`Cleaning History of Git for ${repoName}`);
const cleanGitHistory = isWin ? runCommand(cleanGitHistoryCommandWindows) : runCommand(cleanGitHistoryCommand);
if(!cleanGitHistory) process.exit(-1);

console.log("Congratulations! You are ready. Follow the following commands to start");
console.log(`cd ${repoName}`);
console.log('Create a .env file with LIBRARY_NAME=your_library_name(default: ui-library), External_CSS (optional)(Default: false), EXTERNAL_CSS_NAME=(optional)(Default: index.css)');
console.log(`Then you can run: npm start`);

const deleteFolders = isWin ? runCommand(deleteFoldersCommandWindows) : runCommand(deleteFoldersCommand);
if(!deleteFolders) process.exit(-1);