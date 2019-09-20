const fs = require('fs-extra');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const concat = require('concat');

const src = process.argv[2];
const pathArr = src.split('/');
const srcdir = pathArr.slice(0, [pathArr.length - 1]).join('/'); // up one directory
const outfile = `dist/${pathArr.slice(1, [pathArr.length - 2]).join('/')}/bundle.css`; // up two directories, replace src w dist, add filename

function bundleCSS() {
  fs.readdir(srcdir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      const css = [];
      files.forEach(file => {
        if(/(\.css)$/i.test(file)){
          css.push(`${srcdir}/${file}`);
        }
      });
      if(css.length > 0){
        concat(css).then(combined => {
          fs.outputFile(outfile, combined)
          .then(() => {
            postcss([autoprefixer])
            .process(combined, { from: combined, to: outfile })
            .then(result => {
              fs.outputFile(outfile, result.css);
            });
          });
        });
      }
    }
  });
}

bundleCSS();
