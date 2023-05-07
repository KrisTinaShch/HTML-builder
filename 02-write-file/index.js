const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const write = fs.createWriteStream(path.join(__dirname,`write.txt`));

console.log('Привет! Добавить в этот файл немного текста: ')

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Прощайте!');
    process.exit(0);
  } else {
    write.write(input + '\n');
  }
});

process.on('exit', () => {
  console.log('Досвидания');
});

process.on('SIGINT', function() {
    console.log('Досвидания');
    writeStream.end();
    process.exit(0);
});