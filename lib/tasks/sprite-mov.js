const fs = require('fs-extra');
const path = require('path');
const Spritesmith = require('spritesmith');
const imageSize = require('image-size');
const imageName = 'sprite.mov';
const className = 'sprite-mov';

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const watcher = chokidar.watch('./src/**/sprite-mov/*', {persistent: true, ignoreInitial: true, awaitWriteFinish: true});
const directories = [];
const deb = debounce(spriteMOV, 333, {'trailing': true});
let count = 0;

function movSprite(data){
  const total = data.sprites.length - 1;
  const last = data.sprites[total];
  if(total > 0) {
    return `.${data.spritesheet.name} {
  background-image: url('${data.spritesheet.image}');
  width: ${last.width}px;
  height: ${last.height}px; }
.${data.spritesheet.name}.trans-12fps {
  transition: background-position ${parseFloat((total * 0.083333).toFixed(4))}s steps(${total}); }
.${data.spritesheet.name}.trans-15fps {
  transition: background-position ${parseFloat((total * 0.066667).toFixed(4))}s steps(${total}); }
.${data.spritesheet.name}.trans-18fps {
  transition: background-position ${parseFloat((total * 0.055556).toFixed(4))}s steps(${total}); }
.${data.spritesheet.name}.trans-24fps {
  transition: background-position ${parseFloat((total * 0.041667).toFixed(4))}s steps(${total}); }
.${data.spritesheet.name}.trans-30fps {
  transition: background-position ${parseFloat((total * 0.033333).toFixed(4))}s steps(${total}); }
.${data.spritesheet.name}.trans-60fps {
  transition: background-position ${parseFloat((total * 0.016667).toFixed(4))}s steps(${total}); }
.${data.spritesheet.name}.last-frame {
  background-position: ${last.x * -1}px ${last.y * -1}px; }
.${data.spritesheet.name}.first-frame {
  background-position: 0 0; }
`;
  } else {
    return '';
  }
}

function spriteMOV(){
  console.log(`${count} file changes in ${directories.length} directories`);
  let format = 'png';
  let algorithm = 'top-down';
  directories.forEach(srcdir => {
    const outdir = srcdir.split('/').slice(0, -1).join('/');
    fs.readdir(srcdir, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        const images = [];
        let gif = 0;
        let jpg = 0;
        let png = 0;
        let w = 0;
        let h = 0;
        files.forEach((file) => {
          if(/(\.(jpg|png|gif))$/i.test(file)){
            const ext = file.split('.').pop();
            const dimensions = imageSize(`${srcdir}/${file}`);
            if(w !== 0 && (w !== dimensions.width || h !== dimensions.height)){
              console.log('warning: dimensions of all images in sequence should be uniform');
            }
            w = dimensions.width;
            h = dimensions.height;
            if(ext === 'gif') gif++;
            if(ext === 'jpg') jpg++;
            if(ext === 'png') png++;
            images.push(`${srcdir}/${file}`);
          }
        });
        if(images.length > 0){
          if(gif && !jpg && !png) format = 'gif';
          else if(!gif && jpg && !png) format = 'jpg';
          else format = 'png';
          if(w < h) algorithm = 'left-right'; // uses the last image's dimensions
          console.log(`${w}x${h}: ${algorithm}`);
          Spritesmith.run({
            src: images,
            algorithm: algorithm,
            algorithmOpts: {sort: false},
            padding: 0,
            exportOpts: {
              // using default Pixelsmith engine
              background: [0, 0, 0, 0], // [r,g,b,a] array of 0-255 integers (alpha ignored for jpeg)
              format: format,
              quality: 100
            }
          },
          function handleResult (err, result) {
            if (err) {
              throw err;
            }
            fs.outputFile(`${outdir}/${imageName}.${format}`, result.image);
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
                image: `${imageName}.${format}`,
                name: `${className}`
              }
            };
            let css = movSprite(data);
            fs.outputFile(`${outdir}/${imageName}.css`, css);
            // console.log(result);
          });
        } else {
          console.log(`no valid images found in: ${srcdir}`);
        }
      }
    });
  });
  count = 0;
  directories.length = 0;
}

function handleFileEvent(path){
  let patharr = path.split('/');
  let srcdir = patharr.slice(0,-1).join('/');
  if(directories.indexOf(srcdir) < 0) directories.push(srcdir);
  count++;
  deb();
}

watcher.on('add', handleFileEvent);
watcher.on('change', handleFileEvent);
watcher.on('unlink', handleFileEvent);
