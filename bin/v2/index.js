#! /usr/bin/env node

const yargs = require("yargs");
const path = require("path");
const config = require("../../artisan.json");
const init = require("./init/index.js");
const application = require('./application/index.js');

console.log("Welcome to CLI artisan!\nUse command [artisan --help] for more info.");

// control location of create directory and files.
const production = true;
let pathDir = "";
if (production)
    pathDir = path.join("..", "..", "..", "..", "..", "..", "..");
else
    pathDir = path.join("..", "..", "..", "..");

yargs.usage("\nHow to use: <command> [options]")
    .command("--create <entity> [option]", "Create file in the informed entity on directory: [./src/<option_flag>/]\nOption: \n-a \t application \n \t -c \t core \n -d \t domain \n -e \t errors \n -i \t infra \n -t \t tests")
    .example("artisan --create user -d")
    .array([ "init", "create" ])
    // .command("--init", "Inicializa projeto com a estrutura padrão do artisan.")
    // .example("artisan --init")
    .help(true)
    .argv;

function main(pathDir) {
    if (yargs.argv.init) {
        // create all initial structure.
        console.log('Create all initial structure.');
        init.main(config.directories, pathDir);
        return;
    }

    // if call create
    if (yargs.argv.create) {
        if (!yargs.argv.create[0]) {
            console.log("Structure not selected.");
            return;
        }
        
        if (!yargs.argv.create[1]) {
            console.log("Entity name not given.");
            return;
        }

        const structure = yargs.argv.create[0];
        const entity = yargs.argv.create[1];
        application.main(structure, entity, pathDir);
    }
}

main(pathDir);
