#! /usr/bin/env node

const yargs = require("yargs");
const yargsInteractive = require("yargs-interactive");
const path = require("path");
const generator = require("./init/generator.js");

console.log("Welcome to CLI artisan!\nUse command [artisan --help] for more info.");

// control location of create directory and files.
const production = false;
let pathDir = process.cwd();
if (production)
    pathDir = path.join("..", "..", "..", "..", "..", "..", "..");

yargs.usage("\nHow to use: <command> [options]")
.command("--create <entity> [option]", "Create file in the informed entity on directory: [./src/<option_flag>/]\nOption: \n-a \t application \n \t -c \t core \n -d \t domain \n -e \t errors \n -i \t infra \n -t \t tests")
.example("artisan --create user -d")
.array([ "generator", "i", "create" ])
// .array([ ...Object.keys(commands) ])
// .command("--generator", "Inicializa projeto com a estrutura padrão do artisan.")
// .example("artisan --generator")
.help(true);

const interactionOptions = {
    interactive: { default: true },
    architecture: {
        type: "input",
        describe: "Enter the architecture of the project name (default DDD):"
    },
    database: {
        type: "input",
        describe: "Enter the desired database (default Prisma):"
    }
}

// yargsInteractive.usage("$0 <command> [args]");

const architecture = ["ddd"];
const database = ["prisma", "typeorm"];

const projectSettings = {
    architecture: "",
    database: ""
}

function main(pathDir) {
    if (yargs.argv.i) {
        console.log("Fast generator was called.");
        projectSettings.architecture = "ddd";
        projectSettings.database = "prisma";
        generator.generate(projectSettings, pathDir);
        return;
    }

    if (yargs.argv.generator) {
        console.log("generator was called.");
        
        // if first argument is not set and does not attend architectures from artisan
        if(!yargs.argv.generator[0]) {
            console.log("Architecture not defined.");
            return;
        }
        const _architecture = yargs.argv.generator[0].toLowerCase();
        if (!architecture.includes(_architecture)) {
            console.log("Architecture not defined.");
            return;
        }

        // TODO: second argument is optional?
        // if second argument is not set and does not attend databases from artisan
        if(!yargs.argv.generator[1]) {
            console.log("Database not defined.");
            return;
        }
        const _database = yargs.argv.generator[1].toLowerCase();
        if (!database.includes(_database)) {
            console.log("Database not defined.");
            return;
        }
        
        // create artisan-lock.json
        generator.main(projectSettings, pathDir);
        return;
    }

    // if call create
    if (yargs.argv.create) {
        // TODO: can't create entities without architecture selected
        // if !artisan-lock.architecure
        if (!yargs.argv.create[0]) {
            console.log("Structure not selected.");
            return;
        }
        
        if (!yargs.argv.create[1]) {
            console.log("Entity name not given.");
            return;
        }

        console.log('Creatiting structure and entity...');
        // const structure = yargs.argv.create[0];
        // const entity = yargs.argv.create[1];
        // application.main(structure, entity, pathDir);
        return;
    }

    yargsInteractive().interactive(interactionOptions);
}

main(pathDir);
