const fs = require('fs-extra');
const path = require('path');
const targDir = process.argv[2] || 'dist';
const projectDir = path.resolve(targDir).split('/').slice(-2, -1)[0]; // parent dir of targDir
const glob = require('glob');
const archiver = require('archiver');

fs.emptyDir('zipped').then(() => {
  glob(`${targDir}/*/**/index.html`, (err, files) => {
    files.forEach(file => {
      const dir = file.replace('/index.html', '');
      const filename = `${projectDir}_${dir.replace(`${targDir}/`, '').replace(/\//g, '_')}.zip`;
      fs.removeSync(`${dir}/.DS_Store`);
      // fs.removeSync(`${dir}/Thumbs.db`); // NOTE: for Windows
      const output = fs.createWriteStream(`zipped/${filename}`);
      const archive = archiver('zip', {zlib: {level: 9}});

      output.on('close', () => {
        console.log(`${filename} (${archive.pointer()} bytes)`);
      });

      output.on('end', () => {
        console.log('Data has been drained');
      });

      archive.pipe(output);
      archive.directory(`${dir}`, false);
      archive.finalize();
    });
  });
});
