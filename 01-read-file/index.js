const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(folder, 'utf8');

readStream.on('data', (text) => {
  console.log(text);
});