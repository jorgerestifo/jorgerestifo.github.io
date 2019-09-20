// Version 5.0.4

export function removeSpaces(str) {
  var _str = str;
  return _str.trim().replace(/\s+/g, ''); //remove all spaces
}
export function cleanWhitespace(str) {
  var _str = str;
  return _str.trim().replace(/\s+/g, ' '); //remove extra spaces
}
export function minifyInlineStyle(str) {
  let styles = str.split(';').map(style => {
    let props = style.split(':').map(prop => {
      let _prop = cleanWhitespace(prop);
      if(/\(|\)/.test(prop)){
        _prop = _prop.replace(/\( /g, '(').replace(/ \(/g, '(').replace(/ \)/g, ')').replace(/\) /g, ')');
        _prop = _prop.replace(/, /g, ',').replace(/ ,/g, ',');
      }
      return _prop;
    });
    return cleanWhitespace(props.join(':'));
  });
  // remove unnecessary whitespace, remove trailing ';'s, parseFloat on all decimals to normalize preceeding zeros and convert all hex colors to rgba
  return styles.join(';').toLowerCase().replace(/;+$/, '').replace(/(\d*\.)\d+/g, match => parseFloat(match)).replace(/#[0-9a-f]{3,8}/g, hex => parseHexColor(hex, 'rgba'));
}
export function addElement(parent, opts) {
  const tag = opts.tag || 'div';
  const newElem = document.createElement(tag);
  if(opts.id) newElem.id = opts.id;
  if(opts.text) newElem.appendChild(document.createTextNode(opts.text));
  if(opts.src) newElem.src = opts.src;
  parent.appendChild(newElem);
  return newElem;
}
export function checkUnits(str, defaultUnit) {
  // check for valid units such as %, px, em or apply defaultUnit if not found
  var num = str.replace(/[^0-9.-]/g, '');
  var unit = str.replace(/[^pctxrem%]/g, '');
  var valid = '';
  var defunit = defaultUnit || '';
  if (/%/.test(unit)) {
    unit = '%';
    valid = num + unit;
  } else if(/\b(px|pt|pc|em|rem|ex)\b/.test(unit)) {
    valid = num + unit;
  } else {
    valid = num + defunit;
  }
  return valid;
}
export function groupBy(arr, property) {
  return arr.reduce(function(memo, x) {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
}
export function addStyleMod(elem, prop, val, priority) {
  var pri = priority || '';
  elem.style.setProperty(prop, val, pri);
  logStyleMod(elem, prop);
}

export function logStyleMod(elem, prop) {
  if(!elem.appliedStyles) {
    elem.appliedStyles = prop;
  } else {
    if (elem.appliedStyles.indexOf(prop) < 0) {
      elem.appliedStyles += ',' + prop;
    }
  } // window.console.log(elem.id + '.appliedStyles: ' + elem.appliedStyles);
}
export function removeStyleMods(elem) {
  if(elem.appliedStyles) {
    var props = elem.appliedStyles.split(',');
    for (var i = 0; i < props.length; i++) {
      elem.style.removeProperty(props[i]);
    }
  }
}
export function parseHexColor(hex, format) {
  // possible hex values: #RGB, #RRGGBB, #RGBA, #RRGGBBAA (with or without '#')
  var num = hex.replace(/[^0-9a-fA-F]/g, '');
  var color;
  if(num.length === 8 || num.length === 4) {
    if(num.length === 4) num = [num[0],num[0],num[1],num[1],num[2],num[2],num[3],num[3]].join('');
    var channels = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(num);
    color = 'rgba(' + parseInt(channels[1], 16) + ',' + parseInt(channels[2], 16) + ',' + parseInt(channels[3], 16) + ',' + (parseInt(channels[4], 16) / 255).toFixed(2) + ')';
  } else if (num.length === 6 || num.length === 3) {
    if(num.length === 3) num = [num[0],num[0],num[1],num[1],num[2],num[2]].join('');
    if(format && /^rgb/i.test(format)){
      let channels = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(num);
      (format === 'rgba')
        ? color = 'rgba(' + parseInt(channels[1], 16) + ',' + parseInt(channels[2], 16) + ',' + parseInt(channels[3], 16) + ',1)'
        : color = 'rgb(' + parseInt(channels[1], 16) + ',' + parseInt(channels[2], 16) + ',' + parseInt(channels[3], 16) + ')';
    } else {
      color = '#' + num;
    }
  }
  return color;
}
export function writeCSS(styles) {
  var css = document.createElement('style');
  css.type = 'text/css';
  css.appendChild(document.createTextNode(styles));
  document.head.appendChild(css);
}
export function getLineWraps(elem) {
  // WARNING: use only for rough estimates on text where line-height is specified in css (indirect method, less accurate with large amounts of text)
  var styl = window.getComputedStyle(elem);
  var lh = styl.lineHeight;
  var hi = parseFloat(styl.getPropertyValue('height'));
  if (lh == 'normal') {
    lh = parseFloat(window.getComputedStyle(elem).fontSize) * 1.2; // all bets are off http://meyerweb.com/eric/thoughts/2008/05/06/line-height-abnormal/
  } else {
    lh = parseFloat(lh);
  }
  return Math.round(hi / lh);
}
export function applySuperscript(str) {
  var _str = str;
  _str = _str.replace(/®|&reg;|&#174;/gi, '<sup>®</sup>');
  _str = _str.replace(/™|&trade;|&#8482;/gi, '<sup>™</sup>');
  _str = _str.replace(/℠|&#8480;/gi, '<sup>℠</sup>');
  // _str = _str.replace(/©|&copy;|&#169;/gi, '<sup>©</sup>');
  return _str;
}
export function balanceLines(elem, maxLines, minFontSize) {
  // WARNING: UTF-8 html meta tag required (for the special replacement chars) <head><meta charset="utf-8">...
  // WARNING: this utility uses character count and does not account for actual letter spacing and widths
  // WARNING: directly modifies DOM element
  var fontSize = parseFloat(window.getComputedStyle(elem).fontSize);
  var minFont = minFontSize || fontSize * 0.667; // default is 2/3 the original font-size for the minimum
  if (minFont < 7) minFont = 7; // absolute limit for readability
  var maxW = elem.clientWidth;
  var lines = getLineWraps(elem);
  var txtOrig = elem.innerHTML;
  var breaks = Math.min(lines, maxLines);

  if (lines > 1 && !/<(.|\n)*?>/g.test(txtOrig)) {
    // if more than one line and no html tags found
    var txt = txtOrig;
    txt = txt.replace(/<sup>®<\/sup>/g, 'α');
    txt = txt.replace(/<sup>™<\/sup>/g, 'β');
    txt = txt.replace(/<sup>℠<\/sup>/g, 'γ');
    txt = txt.replace(/<sup>©<\/sup>/g, 'δ');
    var ideal = txt.length / breaks;
    var spacemap = [];
    for (var i = 0; i < txt.length; i++) {
      if (txt[i] === ' ') spacemap.push(i);
    }
    var breakmap = [];
    var closest = 0;
    for (var j = 1; j < breaks; j++) {
      closest = spacemap.reduce(function(prev, curr) {
        return (Math.abs(curr - ideal * j) < Math.abs(prev - ideal * j) ? curr : prev);
      });
      breakmap.push(closest);
      txt = txt.substring(0, closest) + 'Ω' + txt.substring(closest + 1);
    }
    txt = txt.replace(/Ω/g, '<br>');
    txt = txt.replace(/α/g, '<sup>®</sup>');
    txt = txt.replace(/β/g, '<sup>™</sup>');
    txt = txt.replace(/γ/g, '<sup>℠</sup>');
    txt = txt.replace(/δ/g, '<sup>©</sup>');
    elem.innerHTML = txt;
    addStyleMod(elem, 'white-space', 'nowrap');
    addStyleMod(elem, 'display', 'block');

    if (elem.scrollWidth > maxW + 2) {
      resizeText();
    }

  } else if (txtOrig.indexOf('<br') > -1) {
    addStyleMod(elem, 'white-space', 'nowrap');
    addStyleMod(elem, 'display', 'block');
    resizeText();
  } // else window.console.log('balanceLines skipped for: ' + elem.id);

  function resizeText() {
    var newSize = Math.floor(fontSize * (maxW / elem.scrollWidth));
    if (newSize < minFont) {
      newSize = minFont;
      elem.style.whiteSpace = 'normal';
    }
    if (newSize > fontSize) newSize = fontSize; // make sure the text doesn't increase size
    addStyleMod(elem, 'font-size', newSize + 'px', 'important');
  }
}
export function fitText(elem, cb, args){
  const isOverflowing = () => (elem.scrollWidth > elem.offsetWidth || elem.scrollHeight > elem.offsetHeight);
  const overStyle = elem.style.overflow;
  if(!overStyle || overStyle === 'visible') elem.style.overflow = 'hidden';
  function finish(){
    elem.style.overflow = overStyle;
    if(cb) (args) ? cb.apply(this, args) : cb.apply(this);
  }
  function checkSize(){
    let fontSize = parseFloat(window.getComputedStyle(elem).fontSize, 10);
    if (isOverflowing() && fontSize > 7) {
      (fontSize % 1 !== 0) ? fontSize = Math.floor(fontSize) : fontSize--;
      elem.style.fontSize = `${fontSize}px`;
      setTimeout(checkSize, 10); // WARN: async callback
    } else finish();
  }
  checkSize();
}
export function calcTextTopSpace(elem){
  if(elem){
    const cs = window.getComputedStyle(elem);
    const fs = parseFloat(cs.fontSize, 10);
    const lh = parseFloat(cs.lineHeight, 10);
    // return Math.floor((lh - fs) * 0.5); // round down (conservative)
    return Math.round((lh - fs) * 0.5);
  } else {
    console.error('please specify a text element');
    return 0;
  }
}
export function safeJSONParse(json, log){
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch(e) {
    if(log) window.console.log(e);
    parsed = json.toString();
  }
  return parsed;
}
export function defaultVal(option, defalt) {
  let value;
  if (typeof option === 'undefined' || option === '' || typeof option !== typeof defalt) {
    value = defalt;
  } else {
    value = option;
  }
  return value;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
export function polyfillObjectAssign() {
  if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, "assign", {
      value: function assign(target) {
        if (target === null) throw new TypeError('Cannot convert undefined or null to object');
        let to = Object(target);
        for (let i = 1; i < arguments.length; i++) {
          let nextSource = arguments[i];
          if (nextSource !== null) {
            for (let nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }
}
