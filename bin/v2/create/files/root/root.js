module.exports = { main: main }

const generator = require("../../../init/generator");
const path = require("path");
const fsPromises = require("fs").promises;

async function main(pathDir) {
    const src = path.join(__dirname, "files");
    const dest = path.join(pathDir, "src");
    const files = await fsPromises.readdir(src);
    files.forEach(async (file) => {
        console.log(file);
        const filePath = path.join(src, file);
        const fileDest = path.join(dest, file);
        await generator.copyFile(filePath, fileDest);
    });
}
