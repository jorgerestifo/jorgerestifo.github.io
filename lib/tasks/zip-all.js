const fs = require('fs-extra');
const path = require('path');
const targDir = process.argv[2] || 'dist';
const projectDir = path.resolve(targDir).split('/').slice(-2, -1)[0]; // parent dir of targDir
const archiver = require('archiver');
const output = fs.createWriteStream(`${targDir}/${projectDir}.zip`);
const archive = archiver('zip', {zlib: {level: 9}});

output.on('close', () => {
  console.log(`${projectDir}.zip (${archive.pointer()} bytes)`);
});

output.on('end', () => {
  console.log('Data has been drained');
});

archive.pipe(output);
archive.directory('zipped', false);
archive.finalize();
