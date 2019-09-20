const SVGSpriter = require('svg-sprite');
const fs = require('fs-extra');
const glob = require('glob');
const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const watcher = chokidar.watch('./src/**/sprite-svg/*', {persistent: true, ignoreInitial: true, awaitWriteFinish: true});
const directories = [];
const deb = debounce(spriteSVG, 333, {'trailing': true});
let count = 0;

function spriteSVG(){
  console.log(`${count} file changes in ${directories.length} directories`);
  directories.forEach(srcdir => {
    const outdir = srcdir.split('/').slice(0, -1).join('/');
    const spriter = new SVGSpriter({
      shape: {
        id: {
          generator: (name, file) => {
            // i shouldn't have to do this but name is getting lost https://github.com/jkphl/svg-sprite/issues/176
            return file.relative.replace(/\.svg$/, '');
          }
        },
        spacing: {
          padding: 1,
          box: 'content'
        }
      },
      mode: {
        css: {
          hasCommon: true,
          common: 'sprite-svg',
          commonName: 'sprite-svg',
          render: {
            css: {
              template: 'lib/templates/sprite-svg.mustache',
              dest: `${outdir}/sprite.svg.css`
            }
          },
          prefix: '.sprite-svg.%s',
          dimensions: true,
          bust: false,
          sprite: `${outdir}/sprite.svg`,
          dest: ''
        }
      }
    });
    glob.glob('*.svg', {cwd: srcdir}, (err, files) => {
      files.forEach(file => {
        // console.log(file);
        spriter.add(
          `${srcdir}/${file}`,
          file,
          fs.readFileSync(`${srcdir}/${file}`, {encoding: 'utf-8'})
        );
      });
      spriter.compile((error, result /*, data*/) => {
        for (var type in result.css) {
          fs.outputFile(result.css[type].path, result.css[type].contents);
        }
      });
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
