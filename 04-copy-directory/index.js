const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
    const initFolder = path.join(__dirname, 'files');

    const newFolder = path.join(__dirname, 'files-copy');

    try {
        await fs.mkdir(newFolder);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }

    const files = await fs.readdir(initFolder);

    await Promise.all(files.map(async (file) => {

        const initPath = path.join(initFolder, file);
        const newPath = path.join(newFolder, file);

        const stat = await fs.stat(initPath);

        if (stat.isFile()) {

            await fs.copyFile(initPath, newPath);

        } else if (stat.isDirectory()) {

            await copyDirRecursive(initPath, newPath);

        }
    }));
}

async function copyDirRecursive(source, target) {

    try {

        await fs.mkdir(target);

    } catch (err) {

        if (err.code !== 'EEXIST') {

            throw err;

        }
    }


    const files = await fs.readdir(source);


    await Promise.all(files.map(async (file) => {
        const initFolder = path.join(source, file);

        const newPath = path.join(target, file);

        const stat = await fs.stat(initPath);

        if (stat.isFile()) {
            await fs.copyFile(initPath, newPath);
        } else if (stat.isDirectory()) {
            await copyDirRecursive(initPath, newPath);
        }
    }));
}

copyDir()
    .then(() => console.log('Папка скопирована!'))
    .catch((err) => console.error(err));

