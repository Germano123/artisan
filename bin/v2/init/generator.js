module.exports = { generate: generate } 

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

function generate(projectSettings, pathDir) {
    console.log(`Generator been called with ${projectSettings.architecture} and ${projectSettings.database}.`);
    generateArchitecture[projectSettings.architecture](pathDir);
    generateDatabase[projectSettings.database](pathDir, projectSettings.architecture);
}