module.exports = { main: main }

const fs = require("fs");
const path = require("path");

function main(directories, dir) {
    // creating main directories on root and inside src directory
    for (const directory of directories) {
        const mainDir = path.join(__dirname, dir, "src", directory);
        if (fs.existsSync(mainDir)) {
            console.log(directory + "/ has been created.");
        } else {
            console.log('creating ' + directory + '/ directory.');
            fs.mkdirSync(mainDir);
        }
    }
}