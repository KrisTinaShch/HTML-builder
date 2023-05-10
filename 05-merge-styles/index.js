const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const initFolder = '05-merge-styles';

exports.mergeStyles = async function mergeStyles(initFolder, mergedFile) {
    try {
        const folder = await fsPromises.readdir(path.join(`${initFolder}/styles`),
            { withFileTypes: true });
        const bundle = fs.createWriteStream(`${initFolder}/${mergedFile}`)
        for (const file of folder) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                const readFile = fs.createReadStream(`${initFolder}/styles/${file.name}`);
                readFile.pipe(bundle);
            }
        }

    } catch (err) {
        console.error(err.message);
    }
}
exports.mergeStyles(initFolder, 'project-dist/bundle.css');