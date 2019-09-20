/* eslint-env node, es6 */
// version 1.1.0
const ComboSprite = function (data) {
  // console.log('ComboSprite');
  // console.log(data);
  if(data.sprites.length > 0) {
    const selector = data.spritesheet.name;
    const shared = `.${selector} { background-image: url('${data.spritesheet.image}') }`;
    const spritenames = data.sprites.map(obj => obj.name);
    const cls1_5x = {};
    const cls2x = {};
    let media1_5x = '';
    let media2x = '';
    const perSprite = data.sprites.map(sprite => {
      if(/(@2x|-2x)/.test(sprite.name)) {
        let newname = sprite.name.replace(/(@2x|-2x)/g, '');
        if(spritenames.includes(newname)) {
          cls2x[newname] = (`  .${selector}.${newname} {
    width: ${Math.ceil(sprite.width / 2)}px;
    height: ${Math.ceil(sprite.height / 2)}px;
    background-position: ${sprite.x / -2}px ${sprite.y / -2}px;
    background-size: ${data.spritesheet.width / 2}px ${data.spritesheet.height / 2}px; }`);
        } else {
          return `.${selector}.${newname} {
  width: ${Math.ceil(sprite.width / 2)}px;
  height: ${Math.ceil(sprite.height / 2)}px;
  background-position: ${sprite.x / -2}px ${sprite.y / -2}px;
  background-size: ${data.spritesheet.width / 2}px ${data.spritesheet.height / 2}px; }`;
        }
      } else if(/(@1.5x|-1.5x)/.test(sprite.name)) {
        let newname = sprite.name.replace(/(@1.5x|-1.5x)/g, '');
        if(spritenames.includes(newname)) {
          cls1_5x[newname] = (`  .${selector}.${newname} {
    width: ${Math.ceil(sprite.width / 1.5)}px;
    height: ${Math.ceil(sprite.height / 1.5)}px;
    background-position: ${sprite.x / -1.5}px ${sprite.y / -1.5}px;
    background-size: ${data.spritesheet.width / 1.5}px ${data.spritesheet.height / 1.5}px; }`);
        } else {
          return `.${selector}.${newname} {
  width: ${Math.ceil(sprite.width / 1.5)}px;
  height: ${Math.ceil(sprite.height / 1.5)}px;
  background-position: ${sprite.x / -1.5}px ${sprite.y / -1.5}px;
  background-size: ${data.spritesheet.width / 1.5}px ${data.spritesheet.height / 1.5}px; }`;
        }
      } else if(/(@0.5x|-0.5x)/.test(sprite.name)) {
        let newname = sprite.name.replace(/(@0.5x|-0.5x)/g, '');
        if(spritenames.includes(newname)) newname = sprite.name.replace(/(@0.5x|-0.5x)/g, '-0_5x');
        return `.${selector}.${newname} {
  width: ${sprite.width * 2}px;
  height: ${sprite.height * 2}px;
  background-position: ${sprite.x * -2}px ${sprite.y * -2}px;
  background-size: ${data.spritesheet.width * 2}px ${data.spritesheet.height * 2}px; }`;
      } else {
      return `.${selector}.${sprite.name} {
  width: ${sprite.width}px;
  height: ${sprite.height}px;
  background-position: ${sprite.x * -1}px ${sprite.y * -1}px; }`;
      }
    }).filter(sprite => sprite).join('\n');
    Object.keys(cls2x).forEach(x2 => {
      if(!cls1_5x.hasOwnProperty(x2)){
        cls1_5x[x2] = cls2x[x2];
        delete cls2x[x2];
      }
    });
    if(Object.keys(cls1_5x).length > 0){
      media1_5x = `
@media (min-resolution: 102dpi) {
${Object.keys(cls1_5x).map(key => cls1_5x[key]).join('\n')}
}`;
    }
    if(Object.keys(cls2x).length > 0) {
      media2x = `
@media (min-resolution: 168dpi) {
${Object.keys(cls2x).map(key => cls2x[key]).join('\n')}
}`;
    }
    return `${shared}
${perSprite}${media1_5x}${media2x}`;
  } else {
    return '';
  }
};

module.exports = ComboSprite;
