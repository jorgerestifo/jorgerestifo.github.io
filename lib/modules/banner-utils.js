// BannerUtils version 3.1.5

export function es5(){
  return (parseInt('010', 10) === 10) && (function(){return !this;})() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
}
export const log = {
  debug: true,
  trace: function(message) {
    if(window.console && this.debug) {
      window.console.log(message);
    }
  }
};
export function isTouch() {
  const EVENTS = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  const AGENT = typeof window.orientation !== 'undefined' || navigator.userAgent.match(/iPhone|iPad|iPod|Android|IEMobile|Kindle|Silk|BlackBerry|Opera Mini/i);
  return EVENTS && AGENT;
}
export const timer = {
  start: function() {
    this.startTime = new Date().getTime();
  },
  get milliseconds() {
    return new Date().getTime() - this.startTime;
  },
  get seconds() {
    return (new Date().getTime() - this.startTime) * 0.001;
  },
  stop: function() {
    const elapsed = new Date().getTime() - this.startTime;
    log.trace(`seconds elapsed: ${elapsed * 0.001}`);
  }
};
export function preloadImages(images, callback = function(){}, args = [], trace) {
  const _startTime = new Date().getTime();
  const newimages = [];
  const params = (typeof args === 'object') ? args : [args];
  const arr = (typeof images === 'object') ? images : [images];
  let loadedimages = 0;
  function imageloaderror(src) {
    polyfillEvent();
    window.dispatchEvent(new Event('preloaderror'));
    if(trace){
      log.trace(`error loading ${src}`);
      if(callback.name) log.trace(`callback ${callback.name}() aborted`);
    }
  }
  function imageloadpost(src) {
    loadedimages++;
    const seconds = (new Date().getTime() - _startTime) * 0.001;
    if(trace) log.trace(`loaded ${src} @ ${seconds}s`);
    if(loadedimages === arr.length) {
      callback.apply(callback, params);
    }
  }
  if(arr.length === 0){
    callback.apply(callback, params);
  } else {
    for (let i = 0; i < arr.length; i++) {
      newimages[i] = new Image();
      newimages[i].onload = () => { imageloadpost(arr[i]); };
      newimages[i].onerror = () => { imageloaderror(arr[i]); };
      newimages[i].src = arr[i];
    }
  }
}
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}
export function qsa(selector, scope = document) {
  return scope.querySelectorAll(selector);
}
export function domIds(scope = document) {
  const all = scope.getElementsByTagName('*');
  const haveIds = {};
  let i = all.length;
  while (i--) {
    if(all[i].id) {
      const safeId = all[i].id.replace(/-|:|\./g, '_');
      haveIds[safeId] = all[i];
    }
  }
  return haveIds;
}
export const domUtils = {
  // DOM UTILS
  getAllIdElements: function(scope = document) {
    // returns an array of all elements in scope that have an ID
    const items = scope.getElementsByTagName('*');
    const elements = [];
    for (let i = items.length; i--;) {
      if(items[i].hasAttribute('id')) {
        elements.push(items[i]);
      }
    }
    return elements;
  },
  varName: (id, camel) => {
    let newname;
    (camel) ? newname = id.replace(/[-_]([a-z])/g, g => { return g[1].toUpperCase(); }).replace(/[-_]/g,'') : newname = id.replace(/-/g, '_');
    return newname;
  },
  getAllIds: function(scope = document, trace, camel) {
    // returns an array of strings of all the id names in scope
    const items = scope.getElementsByTagName('*');
    const ids = [];
    let varlist = `
function getEl(id){
    return document.getElementById(id);
}
var `;
    const len = items.length;
    for (let i = 0; i < len; i++) {
      if(items[i].hasAttribute('id')) {
        ids.push(items[i].id);
        if(trace) {
          varlist += `${this.varName(items[i].id, camel)} = getEl('${items[i].id}')`;
          if(i > -1) {
            varlist += ',\n    ';
          }
        }
      }
    }
    if(trace) {
      varlist = varlist.replace(/,\s([^,]+)$/, '; $1\n\n');
      log.trace(varlist);
    }
    return ids;
  },
  makeVarsFromIds: function(scope = document, camel) {
    const ids = this.getAllIds(scope);
    let i = ids.length;
    let elements = {};
    while (i--) {
      elements[this.varName(ids[i], camel)] = document.getElementById(ids[i]);
    }
    return elements;
  },
  recordClasses: function(elements = this.getAllIdElements(document)) {
    // record each element's current classList
    let i = elements.length;
    while (i--) {
      elements[i].cl = '';
      elements[i].cl += elements[i].className;
    }
  },
  resetClasses: function(elements = this.getAllIdElements(document), callback) {
    // resets the classes to their recorded state (you must call recordStates() before using this method)
    let i = elements.length;
    while (i--) {
      if(typeof elements[i].cl !== 'undefined') {
        elements[i].className = elements[i].cl;
      } else {
        this.trace(`initial state not recorded for: ${elements[i].id}`);
      }
    }
    if(callback) {
      const dly = elements.length * 10; // KLUDGE adds .01 seconds delay for each element
      setTimeout(() => {callback.apply();}, dly);
    }
  }
};
export function polyfillEvent(){
  // IE polyfills for Event and CustomEvent constructor
  if(typeof window.Event !== 'function') {
    const Event = function(event, params) {
      params = params || {bubbles: false, cancelable: false};
      let evt = document.createEvent('Event');
      evt.initEvent(event, params.bubbles, params.cancelable);
      return evt;
    };
    Event.prototype = window.Event.prototype;
    window.Event = Event;
    const CustomEvent = function(event, params) {
      params = params || {bubbles: false, cancelable: false, detail: undefined};
      let evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
}

export function hasNestedProperty(propertyPath, baseObj = window){
  if(!propertyPath) return false;
  const properties = propertyPath.split('.');
  let obj = baseObj;
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    if(!obj || !obj.hasOwnProperty(prop)){
        log.trace(`undefined: ${prop}`);
        return false;
    } else {
        obj = obj[prop];
    }
  }
  // log.trace(`has: ${propertyPath}`);
  return true;
}

export default es5;
