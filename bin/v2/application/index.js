module.exports = { main: main }

const directory = require("../create/directories/directoryOnSrc.js");
const usecaseFile = require("../create/files/application/usecase.js");
const providerFile = require("../create/files/application/provider.js");
const repositoryFile = require("../create/files/application/repository.js");

const createCommands = {
    "usecase": generateUseCase,
    "provider": generateProvider,
    "repository": generateRepository,
    "domain": generateDomain,
    "error": generateError,
    "controller": generateController,
    "route": generateRoute,
}

function generateUseCase(structure, entity, rootDir) {
    dir = directory.main("application/" + structure, rootDir);
    usecaseFile.create(entity, dir);
}

function generateProvider(structure, entity, rootDir) {
    dir = directory.main("application/" + structure, rootDir);
    providerFile.create(entity, dir);
}

function generateRepository(structure, entity, rootDir) {
    dir = directory.main("application/" + structure + "/" + entity, rootDir);
    repositoryFile.create(entity, dir);
}

function generateDomain(structure, entity, rootDir) {
    console.log("Create Domain command not implemented yet");
}

function generateError(structure, entity, rootDir) {
    console.log("Create Error command not implemented yet");
}

function generateController(structure, entity, rootDir) {
    console.log("Create Controller ommand not implemented yet");
}

function generateRoute(structure, entity, rootDir) {
    console.log("Create Route command not implemented yet");
}

function main(structure, entity, rootDir) {

    if (createCommands[structure]) 
        createCommands[structure](structure, entity, rootDir)
    else console.log('command not found.');
}