const Sprite = require('../modules/sprite');
const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const watcher = chokidar.watch('./src/**/sprite-jpg/*', {persistent: true, ignoreInitial: true, awaitWriteFinish: true});
const directories = [];
const deb = debounce(spriteJPG, 333, {'trailing': true});
let count = 0;

function spriteJPG(){
  console.log(`${count} file changes in ${directories.length} directories`);
  directories.forEach(dir => {
    Sprite({
      srcdir: dir,
      outdir: dir.split('/').slice(0, -1).join('/'),
      format: 'jpg',
      quality: 100,
      background: [0, 0, 0, 255],
      imageName: 'sprite',
      // cssName: 'sprite.jpg',
      className: 'sprite-jpg'
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
