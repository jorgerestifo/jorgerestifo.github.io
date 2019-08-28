(function () {
  'use strict';

  // BannerUtils version 3.1.3

  function es5() {
    // ES5 compliance for: IE10 99%, FF38 99%, CH43 98%, OP38 98%, AN4.4 98%, iOS7 97%, SF6 96%
    // const LEADING_ZEROS = (parseInt('010', 10) === 10); // IE9, FF21, CH23, SF6, OP15, iOS7, AN4.4
    // const USE_STRICT = (function(){return !this;})(); // IE10, FF4, CH13, SF6, OP12.1, iOS5.1, AN3
    // const DATE_ISO_STRING = !!(Date && Date.prototype && Date.prototype.toISOString); // IE9, FF3.5, CH13, SF5, OP10.5, iOS6, AN4
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    debug: true,
    trace: function trace(message) {
      if (window.console && this.debug) {
        window.console.log(message);
      }
    }
  };
  var domUtils = {
    // DOM UTILS
    getAllIdElements: function getAllIdElements() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      // returns an array of all elements in scope that have an ID
      var items = scope.getElementsByTagName('*');
      var elements = [];
      for (var i = items.length; i--;) {
        if (items[i].hasAttribute('id')) {
          elements.push(items[i]);
        }
      }
      return elements;
    },
    varName: function varName(id, camel) {
      var newname = void 0;
      camel ? newname = id.replace(/[-_]([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }).replace(/[-_]/g, '') : newname = id.replace(/-/g, '_');
      return newname;
    },
    getAllIds: function getAllIds() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var trace = arguments[1];
      var camel = arguments[2];

      // returns an array of strings of all the id names in scope
      var items = scope.getElementsByTagName('*');
      var ids = [];
      var varlist = '\nfunction getEl(id){\n    return document.getElementById(id);\n}\nvar ';
      var len = items.length;
      for (var i = 0; i < len; i++) {
        if (items[i].hasAttribute('id')) {
          ids.push(items[i].id);
          if (trace) {
            varlist += this.varName(items[i].id, camel) + ' = getEl(\'' + items[i].id + '\')';
            if (i > -1) {
              varlist += ',\n    ';
            }
          }
        }
      }
      if (trace) {
        varlist = varlist.replace(/,\s([^,]+)$/, '; $1\n\n');
        log.trace(varlist);
      }
      return ids;
    },
    makeVarsFromIds: function makeVarsFromIds() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
      var camel = arguments[1];

      var ids = this.getAllIds(scope);
      var i = ids.length;
      var elements = {};
      while (i--) {
        elements[this.varName(ids[i], camel)] = document.getElementById(ids[i]);
      }
      return elements;
    },
    recordClasses: function recordClasses() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getAllIdElements(document);

      // record each element's current classList
      var i = elements.length;
      while (i--) {
        elements[i].cl = '';
        elements[i].cl += elements[i].className;
      }
    },
    resetClasses: function resetClasses() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getAllIdElements(document);
      var callback = arguments[1];

      // resets the classes to their recorded state (you must call recordStates() before using this method)
      var i = elements.length;
      while (i--) {
        if (typeof elements[i].cl !== 'undefined') {
          elements[i].className = elements[i].cl;
        } else {
          this.trace('initial state not recorded for: ' + elements[i].id);
        }
      }
      if (callback) {
        var dly = elements.length * 10; // KLUDGE adds .01 seconds delay for each element
        setTimeout(function () {
          callback.apply();
        }, dly);
      }
    }
  };

  var Banner = {

    init: function init() {

      log.debug = false; // set to false before publishing
      var dom = domUtils.makeVarsFromIds();

      function turnJS() {
        $('.flipbook').turn({
          width: 600,
          height: 600,
          elevation: 100,
          gradients: false,
          autoCenter: false,
          duration: 1000,
          acceleration: false
        });
      }

      ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
          turnJS();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function flip() {
        $('.flipbook').turn('next');
      }

      function peel() {
        $('.flipbook').turn('peel', 'br');
      }

      function frame0() {
        var tl = new TimelineMax({ onComplete: addRollover });
        dom.ad_content.classList.remove('invisible');

        tl.from(['#txt-1a', '#txt-1b'], 1, { autoAlpha: 0 }).call(peel, [], this, '+=0').call(flip, [], this, '+=0.5').staggerFrom(['#txt-2', '#chemistry'], 1, { autoAlpha: 0 }, 0.5, '+=0.5').call(peel, [], this, '+=1').call(flip, [], this, '+=1').from('#txt-3', 1, { autoAlpha: 0 }, 0.5, '+=0.5').from('#f3-toy-a', 1, { autoAlpha: 0, x: '-=10', y: '-=10' }, '+=0.5').from('#f3-toy-b', 1, { autoAlpha: 0, x: '+=10', y: '+=10' }, '-=1').from('#f3-toy-c', 1, { autoAlpha: 0, x: '+=10', y: '-=10' }, '-=1').staggerFrom(['#f3-shine-1', '#f3-shine-2', '#f3-shine-3'], 0.5, { autoAlpha: 0, repeat: 5, yoyo: true, ease: Sine.easeOut }, 0.2, '-=0.5').call(peel, [], this, '-=1.5').call(flip, [], this, '-=1').from('#txt-4', 1, { autoAlpha: 0 }, '-=0.3').call(peel, [], this, '+=0.5').call(flip, [], this, '+=0.5').staggerFrom(['#txt-ef', '#cta', '#txt-legal'], 1, { autoAlpha: 0 }, 0.2, '+=1');
      }

      ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////

      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          TweenLite.set('#cta', { backgroundColor: '#e31d1a', color: 'white' });
        });

        dom.ad_content.addEventListener('mouseleave', function () {
          TweenLite.set('#cta', { clearProps: 'backgroundColor, color' });
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      }

      ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////

      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    Banner.init();
  };

}());
