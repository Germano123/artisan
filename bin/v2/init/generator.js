// @dev This script responsability is to handle the project settings to be generated
module.exports = {
    generate: generate,
    generateFolder: generateFolder,
    copyFile: copyFile,
} 

const path = require("path");
const fsPromises = require("fs").promises;

const generateDDD = require("./generator/ddd.generate.js").generateDDD;
const generatePrisma = require("./generator/prisma.generate.js").generatePrisma;
const generateTypeORM = require("./generator/typeorm.generate.js").generateTypeORM;

const generateArchitecture = {
    "ddd": generateDDD,
}

const generateDatabase = {
    "prisma": generatePrisma,
    "typeorm": generateTypeORM,
}

// TODO: generate => generateProject
function generate(projectSettings, pathDir) {
    console.log(`Generator been called with ${projectSettings.architecture} and ${projectSettings.database}.`);
    generateArchitecture[projectSettings.architecture](pathDir);
    // database is optional
    if (!projectSettings.database)
        generateDatabase[projectSettings.database](pathDir, projectSettings.architecture);

    // TODO: analise if file entities should be created from here
}

// TODO: generate file
// data to generate, destination path to generate at
function generateFile(filePath, fileDestination) {
    // TODO: fsPromises.create()
}

// TODO: copy file from `from` folder to `to` folder
async function copyFile(from, to) {
    await fsPromises.copyFile(from, to);
}

// TODO: create folder
async function generateFolder(pathDir, dirName) {
    let _dir;

    if (dirName) _dir = path.join(pathDir, "src", dirName);
    else _dir = path.join(pathDir, "src");
    
    await fsPromises.mkdir(_dir, { recursive: true });
    console.log(`Generating folder ${ (dirName) ? dirName : "src" }/`);
}