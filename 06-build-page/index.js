

const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');


const merge = require('../05-merge-styles/index');
const { copyDir } = require('../04-copy-directory/copyDir');
const folder = '06-build-page';

async function buildPage() {
    try {
        await fsPromises.mkdir(path.join(`${folder}/project-dist`), { recursive: true });
        function fileToString(stream) {

            const chunks = [];

            return new Promise((resolve, reject) => {

                stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
                stream.on('error', (error) => reject(error));
                stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
            })
        };

        let templateData = await fileToString(fs.createReadStream(`${folder}/template.html`));

        const components = await fsPromises.readdir(path.join(`${folder}/components`));

        for (const file of components) {
            const fileData = await fileToString(fs.createReadStream(`${folder}/components/${file}`));
            templateData = templateData.replace(`{{${path.basename(file, '.html')}}}`, fileData);
        }


        const res = fs.createWriteStream(`${folder}/project-dist/index.html`);
        res.write(templateData);
        merge.mergeStyles(folder, '/project-dist/style.css');
        copyDir(folder, 'assets', 'project-dist/assets')
    } catch (err) {
        console.error(err.message);
    }
}
buildPage();