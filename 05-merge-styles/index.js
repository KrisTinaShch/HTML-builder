const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const folder = '05-merge-styles';

exports.mergeStyles = async function mergeStyles(folder, mergedFile) {
    try {

        const folder = await fsPromises.readdir(path.join(`${folder}/styles`),
            { withFileTypes: true });

        const bundle = fs.createWriteStream(`${folder}/${mergedFile}`)
        for (const file of folder) {
            if (file.isFile() && path.extname(file.name) === '.css') {
                const readFile = fs.createReadStream(`${folder}/styles/${file.name}`);
                readFile.pipe(bundle);
            }
        }

    } catch (err) {
        console.error(err.message);
    }
}

exports.mergeStyles(folder, 'project-dist/bundle.css');