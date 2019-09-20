const sass = require('node-sass');
const fs = require('fs-extra');

const src = process.argv[2];
const pathArr = src.split('/');
const outpath = pathArr.slice(0, [pathArr.length - 1]).join('/');
const dest = `${outpath}/styles/main.css`;

function compileSass() {
  sass.render({
    file: src,
    includePaths: ['lib/sass/'],
    outputStyle: 'nested'
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      fs.outputFile(dest, result.css);
    }
  });
}

compileSass();
