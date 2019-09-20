const Sprite = require('../modules/sprite');
const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const watcher = chokidar.watch('./src/**/sprite-png/*', {persistent: true, ignoreInitial: true, awaitWriteFinish: true});
const directories = [];
const deb = debounce(spritePNG, 333, {'trailing': true});
let count = 0;

function spritePNG(){
  console.log(`${count} file changes in ${directories.length} directories`);
  directories.forEach(dir => {
    Sprite({
      srcdir: dir,
      outdir: dir.split('/').slice(0, -1).join('/'),
      format: 'png',
      // quality: 100,
      // background: [255, 255, 255, 255],
      imageName: 'sprite',
      // cssName: 'sprite.png',
      className: 'sprite-png'
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
