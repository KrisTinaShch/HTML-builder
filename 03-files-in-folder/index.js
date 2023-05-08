const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, (err, files) => {
  if (err) {
    console.error(`Error reading folder: ${err}`);
    return;
  }
  files.forEach((file) => {
    const filePath = path.join(folder, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(`Error getting file stats for ${file}: ${err}`);
        return;
      }
      if (stats.isFile()) {
        const bytesSize = stats.size;
        const kbSize = bytesSize / 1024;
        const extension = path.extname(file);
        const fileName = path.basename(file, extension);
        console.log(`${fileName} - ${extension} - ${kbSize.toFixed(3)}kb`);
      }
    });
  });
});