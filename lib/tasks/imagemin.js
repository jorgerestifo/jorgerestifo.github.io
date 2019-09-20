const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminGifsicle = require('imagemin-gifsicle');
const fs = require('fs-extra');

const src = process.argv[2]; // currently only optimizing the file that changed (not entire directory)
const filename = src.split('/').slice(-1);
const outdir = src.split('/').slice(0, -1).join('/').replace(/\bsrc\b/i, 'dist').replace(/\/styles\b/, '');
const outfile = `${outdir}/${filename}`;
const low = /[-_@][1-9]x./.test(filename); // more compression on @2x @3x... res (retina) images
const mid = /^sprite|^backup/i.test(filename);
const pngQual = low ? [0.3, 0.5] : [0.6, 0.8];
const jpgQual = mid ? 79 : low ? 65 : 89;

if(fs.existsSync(src)){
  imagemin([src], outdir, {
    plugins: [
      imageminMozjpeg({quality: jpgQual}),
      imageminPngquant({strip: true, quality: pngQual}),
      imageminSvgo(),
      imageminGifsicle()
    ]
  }).then(output => {
    output.forEach(file => {
      const before = fs.statSync(src).size;
      const after = fs.statSync(file.path).size;
      console.log(`optimized: ${file.path}, saved: ${((1 - (after / before)) * 100).toFixed(1)}%`);
    });
  });
} else {
  if(fs.existsSync(outfile)){
    fs.unlink(outfile, err => {
      (err) ? console.log(err) : console.log(`deleted: ${outfile}`);
    });
  }
}
