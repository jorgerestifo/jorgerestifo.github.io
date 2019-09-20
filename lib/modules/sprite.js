const fs = require('fs-extra');
const path = require('path');
// const Spritesmith = require('spritesmith');
const Spritesmith = require('./smith-mod');
const ComboSprite = require('./combo-sprite');

function Sprite(opts){
  fs.readdir(opts.srcdir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      const images = [];
      files.forEach((file) => {
        if(/(\.(jpg|png|gif))$/i.test(file)){
          images.push(`${opts.srcdir}/${file}`);
        }
      });
      if(images.length > 0){
        Spritesmith.run({
          src: images,
          algorithm: 'binary-tree',
          padding: 6,
          evenDimensions: true, // custom option only in ./smith-mod (ensures all widths and heights are even numbers for ./combo-sprite)
          exportOpts: {
            // using default Pixelsmith engine
            background: opts.background || [0, 0, 0, 0], // [r,g,b,a] array of 0-255 integers (alpha ignored for jpeg)
            format: opts.format || 'png',
            quality: opts.quality || 100
          }
        },
        function handleResult (err, result) {
          if (err) {
            throw err;
          }
          fs.outputFile(`${opts.outdir}/${opts.imageName}.${opts.format}`, result.image);
          let sprites = Object.keys(result.coordinates).map(key => {
            const name = path.parse(key).name;
            result.coordinates[key].name = name;
            return result.coordinates[key];
          });
          const data = {
            sprites: sprites,
            spritesheet: {
              width: result.properties.width,
              height: result.properties.height,
              image: `${opts.imageName}.${opts.format}`,
              name: `${opts.className}`
            }
          };
          let css = ComboSprite(data);
          fs.outputFile(`${opts.outdir}/${opts.imageName}.${opts.format}.css`, css);
          // console.log(result);
        });
      } else {
        console.log(`no valid images found in: ${opts.srcdir}`);
      }
    }
  });
}

module.exports = Sprite;
