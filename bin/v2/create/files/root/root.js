module.exports = { main: main }

const generator = require("../../../init/generator");
const path = require("path");
const fsPromises = require("fs").promises;

async function main(pathDir) {
    const src = path.join(__dirname, "files");
    const files = await fsPromises.readdir(src);
    files.forEach(async (file) => {
        console.log(file);
        const filePath = path.join(src, file);
        const fileDest = path.join(pathDir, file);
        await generator.copyFile(filePath, fileDest);
    });
    
    const packageFile = JSON.parse(await fsPromises.readFile(__dirname+"/package.json", "utf-8"));
    let artisanPackage = JSON.parse(await fsPromises.readFile(pathDir+"/package.json", "utf-8"));
    // TODO: look over recursive cases
    /* example:
{
  "a": "aaa",
  "b": {
    "B": "BBB",
    "C": "CCC"
  }
}
{ "c": "ccc" }
    */
    Object.keys(packageFile).forEach((element) => {
        if (artisanPackage[element]) {
            artisanPackage[element] = {
                ...artisanPackage[element],
                ...packageFile[element]
            }
        } else artisanPackage[element] = packageFile[element];
    });
    await generator.generateFile(pathDir+"/package.json", JSON.stringify(artisanPackage));
}
