module.exports = { generateDDD: generate }

const dto = require("../../create/files/domain/dto.js");
const entity = require("../../create/files/domain/entity.js");
const mapper = require("../../create/files/domain/mapper.js");
const date = require("../../create/files/application/date.js");
const jwt = require("../../create/files/application/jwt.js");
const mail = require("../../create/files/application/mail.js");
const either = require("../../create/files/core/either.js");
const entityCore = require("../../create/files/core/entity.js");
const maybe = require("../../create/files/core/maybe.js");
const parse_types = require("../../create/files/core/parse-types.js");
const status = require("../../create/files/core/status.js");
const validate_account = require("../../create/files/core/validate-account.js");
const appErrors = require("../../create/files/errors/app.js");
const bad_requestErrors = require("../../create/files/errors/bad-request.js");
const not_foundErrors = require("../../create/files/errors/not-found.js");
const unauthorizedErrors = require("../../create/files/errors/unauthorized.js");
const datefns = require("../../create/files/infra/datefns-date.adapter.js");
const index = require("../../create/files/infra/index.js");
const jsonwebtoken = require("../../create/files/infra/jsonwebtoken-jwt.adapter.js");
const jwtInfra = require("../../create/files/infra/jwt.config.js");
const providers = require("../../create/files/infra/providers.js");
const repositories = require("../../create/files/infra/repositories.js");
const controller = require("../../create/files/infra/controller.js");
const ensure_authenticated = require("../../create/files/infra/ensure-authenticated.middleware.js");
const exception = require("../../create/files/infra/exception.middleware.js");
const server = require("../../create/files/infra/server.js");
const indexRoute = require("../../create/files/infra/indexRoute.js");
const route = require("../../create/files/infra/route.js");
const rootFiles = require("../../create/files/root/root.js");

const generator = require("../generator.js");

async function generate(pathDir) {
    console.log("Generating architecture Domain-Driven Design");
    const architectureDirs = ["application", "core", "domain", "errors", "infra", "tests"];

    // creating src directory
    // src.main(pathDir);
    await generator.generateFolder(pathDir);

    // add root files in your root project directory
    await rootFiles.main(pathDir);
    
    // creating main directories
    architectureDirs.forEach((dirName) => {
        generator.generateFolder(pathDir, dirName);
    });

    // creating initial files
    application(pathDir);
    core(pathDir);
    domain(pathDir);
    errors(pathDir);
    infra(pathDir);
    tests(pathDir);
}

// TODO: refactor this
/**
 * Functions for creating directories and initial files.
 */
 function application(pathDir){
    // creating directories for application
    const applicationDirs = ["providers", "repositories", "usecases", "views"];
    applicationDirs.forEach((dir) => {
        generator.generateFolder(pathDir, "application/"+dir);
    });

    // creating files for application
    // TODO: change responsability to file creation to generator
    // generator.generateFile(filePath, pathDir+"/src/application/providers");
    const providerDir = pathDir+"/src/application/providers";
    date.create("date", providerDir);
    jwt.create("jwt", providerDir);
    mail.create("mail", providerDir);
}

function core(pathDir){
    // creating directories for core
    const applicationDirs = ["config", "domain", "dtos", "logic"];
    applicationDirs.forEach((dir) => {
        generator.generateFolder(pathDir, "core/"+dir);
    });

    // creating files for core
    const configDir = pathDir+"/src/core/config";
    const domainDir = pathDir+"/src/core/domain";
    const dtosDir = pathDir+"/src/core/dtos";
    const logicDir = pathDir+"/src/core/dtos";

    validate_account.create("validate-account", configDir);
    entityCore.create("entity", domainDir);
    parse_types.create("parse-types", dtosDir);
    status.create("status", dtosDir);
    either.create("either", logicDir);
    maybe.create("maybe", logicDir);
}

function domain(pathDir){
    // creating directories for domain
    const applicationDirs = ["user", "user/dtos", "user/entities", "user/mappers"];
    applicationDirs.forEach((dir) => {
        generator.generateFolder(pathDir, "domain/"+dir);
    });

    // creating files for domain
    const dtoDir = pathDir + "/src/domain/user/dtos";
    const entityDir = pathDir + "/src/domain/user/entities";
    const mapperDir = pathDir + "/src/domain/user/mappers";

    // creating initial files
    dto.create("user", dtoDir);
    entity.create("user", entityDir);
    mapper.create("user", mapperDir);
}

function errors(pathDir){
    // creating directories for domain
    generator.generateFolder(pathDir, "errors");
    
    // creating initial files
    const errorDir = pathDir + "/src/errors";
    
    appErrors.create("app", errorDir);
    bad_requestErrors.create("bad-request", errorDir);
    not_foundErrors.create("not-found", errorDir);
    unauthorizedErrors.create("unauthorized", errorDir);
}

function infra(pathDir){
    // creating directories for infra
    const applicationDirs = [
        "adapters",
        "config",
        "container",
        "container",
        "database",
        "http",
        "http/controllers",
        "http/controllers/User",
        "http/middlewares",
        "http/routes",
        "utils",
    ];
    applicationDirs.forEach(async (dir) => {
        await generator.generateFolder(pathDir, "infra/"+dir);
    });

    // creating initial files
    const adaptersDir = pathDir + "/src/infra/adapters";
    const configDir = pathDir + "/src/infra/config";
    const containerDir = pathDir + "/src/infra/container";
    const httpDir = pathDir + "/src/infra/http";
    const userControllerDir = pathDir + "/src/infra/http/controllers/User";
    const middlewareDir = pathDir + "/src/infra/http/middlewares";
    const routeDir = pathDir + "/src/infra/http/routes";

    datefns.create("datefns-date", adaptersDir);
    jsonwebtoken.create("jsonwebtoken-jwt", adaptersDir);

    jwtInfra.create("jwt", configDir);
    
    index.create("index", containerDir);
    providers.create("providers", containerDir);
    repositories.create("repositories", containerDir);
    
    server.create("server", httpDir);
    
    controller.create("User", userControllerDir);
    
    ensure_authenticated.create("ensure-authenticated", middlewareDir);
    
    exception.create("exception", middlewareDir);
    
    indexRoute.create("index", routeDir);
    route.create("User", routeDir);
}

function tests(pathDir){
    // creating directories for tests
    generator.generateFolder(pathDir, "tests/adapters");
    generator.generateFolder(pathDir, "tests/repositories");
}